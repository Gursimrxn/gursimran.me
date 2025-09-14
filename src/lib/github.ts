// utils/getGithubContributions.ts
import { GetGithubContributions } from '@/lib/graphql';
import type { GithubContributionData } from '@/types';

interface ContributionsResponseData {
  user?: {
    contributionsCollection?: {
      contributionCalendar?: {
        totalContributions: number;
        weeks: Array<{ contributionDays: Array<{ contributionCount: number; date: string }> }>;
      };
      commitContributionsByRepository?: Array<{
        repository: { id: string; nameWithOwner: string; url: string; isPrivate: boolean };
        contributions: {
          totalCount: number;
          pageInfo: { hasNextPage: boolean; endCursor?: string | null };
          nodes?: Array<{ occurredAt: string; commitCount: number }>;
        };
      }>;
    };
    repositories?: { nodes: Array<{ pushedAt: string | null }> };
  };
}

const isoDateToYMDSlash = (iso: string) => {
  try {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso.split('T')[0].replace(/-/g, '/');
    return d.toISOString().slice(0, 10).replace(/-/g, '/'); // YYYY/MM/DD
  } catch {
    return iso.split('T')[0].replace(/-/g, '/');
  }
};

const defaultWindow = () => {
  const to = new Date();
  const from = new Date();
  from.setDate(to.getDate() - 365);
  return { from: from.toISOString(), to: to.toISOString() };
};

type FetchVars = {
  login: string;
  from: string;
  to: string;
  maxRepos?: number;
  contribsFirst?: number;
  contribsAfter?: string | null;
};

const GITHUB_GRAPHQL_URL = 'https://api.github.com/graphql';

const getGithubContributions = async (
  username: string,
  opts?: { from?: string; to?: string; maxRepos?: number; contribsFirst?: number }
): Promise<
  GithubContributionData & {
    perRepoContributions: Array<{ repo: string; date: string; count: number }>;
  }
> => {
  // Mock fallback when no token
  if (!process.env.GITHUB_ACCESS_TOKEN) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('No GitHub token provided, using mock data');
    }

    const mockContribs = Array.from({ length: 30 }, (_, i) => ({
      count: Math.floor(Math.random() * 10),
      date: isoDateToYMDSlash(new Date(Date.now() - i * 86400000).toISOString())
    }));

    return {
      lastPushedAt: new Date().toISOString(),
      totalContributions: mockContribs.reduce((s, c) => s + c.count, 0),
      contributions: mockContribs,
      perRepoContributions: []
    };
  }

  // compute time window
  const { from, to } = opts?.from && opts?.to ? { from: opts.from, to: opts.to } : defaultWindow();

  // Prepare variables
  const variables: FetchVars = {
    login: username,
    from,
    to,
    contribsAfter: null
  };

  const body = JSON.stringify({ query: GetGithubContributions, variables });

  if (process.env.NODE_ENV !== 'production') {
    console.debug('[github] GraphQL variables:', variables);
  }

  const res = await fetch(GITHUB_GRAPHQL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`
    },
    body,
    // Keep this if running on Next.js server runtime
    next: { revalidate: 3600 }
  });

  if (!res.ok) {
    const txt = await res.text();
    if (process.env.NODE_ENV !== 'production') {
      console.error('[github] HTTP error:', res.status, res.statusText, txt);
    }
    throw new Error(`GitHub GraphQL request failed: ${res.status} ${res.statusText}`);
  }

  const json = await res.json();

  // GraphQL-level errors
  if (json.errors && Array.isArray(json.errors) && json.errors.length > 0) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('[github] GraphQL errors:', json.errors);
    }
    throw new Error(
      `GitHub GraphQL errors: ${json.errors
        .map((e: { message?: string }) => e.message ?? String(e))
        .join('; ')}`
    );
  }

  const data = (json as { data?: ContributionsResponseData }).data;
  if (!data?.user) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[github] no user data returned for', username, json);
    }
    return {
      lastPushedAt: new Date().toISOString(),
      totalContributions: 0,
      contributions: [],
      perRepoContributions: []
    };
  }

  const calendar = data.user.contributionsCollection?.contributionCalendar;
  const repoNodes = data.user.repositories?.nodes ?? [];

  // Build flattened calendar contributions (what your UI used before)
  const calendarContributions =
    (calendar?.weeks ?? []).flatMap(week =>
      (week.contributionDays ?? []).map(d => ({
        count: d.contributionCount,
        date: isoDateToYMDSlash(d.date)
      }))
    ) ?? [];

  // Build per-repo per-date list from commitContributionsByRepository
  const perRepoContributions: Array<{ repo: string; date: string; count: number }> = [];

  const repoContribs = data.user.contributionsCollection?.commitContributionsByRepository ?? [];

  repoContribs.forEach(repoItem => {
    const repoName = repoItem.repository?.nameWithOwner ?? 'unknown';
    const nodes = repoItem.contributions?.nodes ?? [];
    nodes.forEach(node => {
      // `occurredAt` may include time; normalize to YYYY/MM/DD
      perRepoContributions.push({
        repo: repoName,
        date: isoDateToYMDSlash(node.occurredAt),
        count: node.commitCount
      });
    });

    // If there are more pages inside this repo's contributions, warn in dev
    if (repoItem.contributions?.pageInfo?.hasNextPage) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn(
          `[github] contributions for repo ${repoName} hasNextPage=true - you need to implement per-repo paging to get all buckets.`
        );
      }
    }
  });

  // last pushed at — we requested repositories(first:1, orderBy: PUSHED_AT) in query
  const lastPushedAt = repoNodes?.[0]?.pushedAt ?? new Date().toISOString();

  return {
    lastPushedAt,
    totalContributions: calendar?.totalContributions ?? 0,
    contributions: calendarContributions,
    perRepoContributions
  };
};

export default getGithubContributions;

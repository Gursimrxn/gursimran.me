// utils/getGithubContributions.ts
import { GetGithubContributions, GetGithubCodeStats } from '@/lib/graphql';
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

// Types for code stats
export interface LanguageStat {
  name: string;
  color: string;
  bytes: number;
  percentage: number;
}

export interface GithubCodeStats {
  totalBytes: number;
  estimatedLines: number;
  repositoryCount: number;
  languages: LanguageStat[];
  topLanguage: string;
}

interface CodeStatsResponse {
  user?: {
    repositories?: {
      totalCount: number;
      nodes: Array<{
        name: string;
        languages?: {
          totalSize: number;
          edges: Array<{
            size: number;
            node: {
              name: string;
              color: string | null;
            };
          }>;
        };
      }>;
    };
    repositoriesContributedTo?: {
      totalCount: number;
      nodes: Array<{
        name: string;
        owner: {
          login: string;
        };
        languages?: {
          totalSize: number;
          edges: Array<{
            size: number;
            node: {
              name: string;
              color: string | null;
            };
          }>;
        };
      }>;
    };
  };
}

// Bytes per line estimates by language (rough averages)
const BYTES_PER_LINE: Record<string, number> = {
  'JavaScript': 35,
  'TypeScript': 40,
  'Python': 30,
  'Java': 45,
  'C++': 40,
  'C': 35,
  'Go': 35,
  'Rust': 40,
  'HTML': 50,
  'CSS': 40,
  'SCSS': 35,
  'JSON': 25,
  'Markdown': 60,
  'default': 40
};

export const getGithubCodeStats = async (username: string): Promise<GithubCodeStats> => {
  // Mock fallback when no token
  if (!process.env.GITHUB_ACCESS_TOKEN) {
    return {
      totalBytes: 34689600, // ~850k lines
      estimatedLines: 847234,
      repositoryCount: 23,
      languages: [
        { name: 'TypeScript', color: '#3178c6', bytes: 15000000, percentage: 43.2 },
        { name: 'JavaScript', color: '#f7df1e', bytes: 8000000, percentage: 23.1 },
        { name: 'Python', color: '#3572A5', bytes: 5000000, percentage: 14.4 },
        { name: 'CSS', color: '#563d7c', bytes: 3000000, percentage: 8.7 },
        { name: 'HTML', color: '#e34c26', bytes: 2000000, percentage: 5.8 },
      ],
      topLanguage: 'TypeScript'
    };
  }

  try {
    const res = await fetch(GITHUB_GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`
      },
      body: JSON.stringify({ 
        query: GetGithubCodeStats, 
        variables: { login: username } 
      }),
      next: { revalidate: 86400 } // Cache for 24 hours
    });

    if (!res.ok) {
      throw new Error(`GitHub API error: ${res.status}`);
    }

    const json = await res.json();
    const data = json.data as CodeStatsResponse;

    if (!data?.user?.repositories) {
      throw new Error('No repository data found');
    }

    const ownRepos = data.user.repositories.nodes;
    const contributedRepos = data.user.repositoriesContributedTo?.nodes || [];
    
    // Total unique repos (own + contributed)
    const repoCount = data.user.repositories.totalCount + (data.user.repositoriesContributedTo?.totalCount || 0);

    // Aggregate language bytes across all repos
    const languageMap = new Map<string, { bytes: number; color: string }>();

    // Process own repos
    ownRepos.forEach(repo => {
      repo.languages?.edges.forEach(edge => {
        const existing = languageMap.get(edge.node.name);
        if (existing) {
          existing.bytes += edge.size;
        } else {
          languageMap.set(edge.node.name, {
            bytes: edge.size,
            color: edge.node.color || '#8b8b8b'
          });
        }
      });
    });

    // Process contributed repos (orgs like Dhaniverse)
    contributedRepos.forEach(repo => {
      repo.languages?.edges.forEach(edge => {
        const existing = languageMap.get(edge.node.name);
        if (existing) {
          existing.bytes += edge.size;
        } else {
          languageMap.set(edge.node.name, {
            bytes: edge.size,
            color: edge.node.color || '#8b8b8b'
          });
        }
      });
    });

    // Calculate totals
    let totalBytes = 0;
    languageMap.forEach(lang => {
      totalBytes += lang.bytes;
    });

    // Convert to array and sort by size
    const languages: LanguageStat[] = Array.from(languageMap.entries())
      .map(([name, data]) => ({
        name,
        color: data.color,
        bytes: data.bytes,
        percentage: Math.round((data.bytes / totalBytes) * 1000) / 10
      }))
      .sort((a, b) => b.bytes - a.bytes)
      .slice(0, 8); // Top 8 languages

    // Estimate lines of code (weighted by language)
    let estimatedLines = 0;
    languageMap.forEach((data, name) => {
      const bytesPerLine = BYTES_PER_LINE[name] || BYTES_PER_LINE['default'];
      estimatedLines += Math.round(data.bytes / bytesPerLine);
    });

    return {
      totalBytes,
      estimatedLines,
      repositoryCount: repoCount,
      languages,
      topLanguage: languages[0]?.name || 'Unknown'
    };
  } catch (error) {
    console.error('Error fetching GitHub code stats:', error);
    // Return mock data on error
    return {
      totalBytes: 34689600,
      estimatedLines: 847234,
      repositoryCount: 23,
      languages: [
        { name: 'TypeScript', color: '#3178c6', bytes: 15000000, percentage: 43.2 },
        { name: 'JavaScript', color: '#f7df1e', bytes: 8000000, percentage: 23.1 },
      ],
      topLanguage: 'TypeScript'
    };
  }
};

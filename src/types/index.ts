// GitHub contribution types
export interface GithubContribution {
  date: string;
  count: number;
}

export interface GithubContributionData {
  totalContributions: number;
  contributions: GithubContribution[];
  lastPushedAt: string;
}

export interface GithubRepositoryLastUpdated {
  pushedAt: string;
}
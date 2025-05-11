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

// MonkeyType typing speed data
export type MonkeyTypeLanguage = 'english';

export interface MonkeyTypeData {
  wpm: number;
  acc: number;
  time: number;
  language?: MonkeyTypeLanguage;
}

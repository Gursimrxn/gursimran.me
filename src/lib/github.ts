import request from 'graphql-request';

import { GetGithubContributions } from '@/lib/graphql';
import type { GithubContributionData } from '@/types';

const getGithubContributions = async (username: string): Promise<GithubContributionData> => {
  // If no GitHub token is provided, return mock data
  if (!process.env.GITHUB_ACCESS_TOKEN) {
    console.warn('No GitHub token provided, using mock data');
    return {
      lastPushedAt: new Date().toISOString(),
      totalContributions: 365,
      contributions: Array.from({ length: 30 }, (_, i) => ({
        count: Math.floor(Math.random() * 10),
        date: new Date(Date.now() - (i * 24 * 60 * 60 * 1000)).toISOString().replace(/-/g, '/')
      }))
    };
  }

  try {
    const response = await request({
      url: 'https://api.github.com/graphql',
      document: GetGithubContributions,
      variables: { userName: username },
      requestHeaders: {
        Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`
      }
    });

    const parsedResponse = (response as any).user.contributionsCollection.contributionCalendar;

    return {
      lastPushedAt: (response as any).user.repositories.nodes[0].pushedAt,
      totalContributions: parsedResponse.totalContributions,
      contributions: parsedResponse.weeks.flatMap((week: any) => {
        return week.contributionDays.map((day: any) => {
          return {
            count: day.contributionCount,
            date: day.date.replace(/-/g, '/')
          };
        });
      })
    };
  } catch (error) {
    console.error('Error fetching GitHub contributions:', error);
    throw error;
  }
};

export default getGithubContributions;
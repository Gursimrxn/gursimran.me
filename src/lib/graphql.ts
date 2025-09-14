import { gql } from 'graphql-request';

export const GetGithubContributions = gql`
  query GetGithubContributions($login: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $login) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
      }
      repositories(first: 1, orderBy: { field: PUSHED_AT, direction: DESC }) {
        nodes {
          pushedAt
        }
      }
    }
  }
`;

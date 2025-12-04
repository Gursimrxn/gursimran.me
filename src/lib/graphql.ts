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
        commitContributionsByRepository(maxRepositories: 100) {
          repository {
            nameWithOwner
            isPrivate
          }
          contributions(first: 100) {
            totalCount
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

export const GetGithubCodeStats = gql`
  query GetGithubCodeStats($login: String!) {
    user(login: $login) {
      repositories(first: 100, ownerAffiliations: [OWNER, ORGANIZATION_MEMBER, COLLABORATOR], isFork: false, orderBy: { field: UPDATED_AT, direction: DESC }) {
        totalCount
        nodes {
          name
          languages(first: 10, orderBy: { field: SIZE, direction: DESC }) {
            totalSize
            edges {
              size
              node {
                name
                color
              }
            }
          }
        }
      }
      repositoriesContributedTo(first: 100, contributionTypes: [COMMIT, PULL_REQUEST], orderBy: { field: UPDATED_AT, direction: DESC }) {
        totalCount
        nodes {
          name
          owner {
            login
          }
          languages(first: 10, orderBy: { field: SIZE, direction: DESC }) {
            totalSize
            edges {
              size
              node {
                name
                color
              }
            }
          }
        }
      }
    }
  }
`;

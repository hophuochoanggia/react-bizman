import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';
import { GRAPHQL } from '../config';

export const LOGIN_MUTATION = gql`
  mutation loginMutation($username: String!, $password: String!) {
    login(input: { username: $username, password: $password }) {
      token
    }
  }
`;

export const CREATE_USER_MUTATION = gql`
  mutation createUserMutation($input: createUserInput!) {
    createUser(input: $input) {
      response {
        username
        firstName
        lastName
      }
    }
  }
`;

export const EDIT_USER_MUTATION = gql`
  mutation editUserByIdMutation($id: Int!, $input: createUserInput!) {
    editUserById(id: $id, input: $input) {
      response {
        username
        firstName
        lastName
      }
    }
  }
`;

export const USERS_QUERY = gql`
  query users($role: String!) {
    users(role: $role) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      edges {
        node {
          _id
          firstName
          lastName
          email
        }
      }
    }
  }
`;

export const USER_BY_ID_QUERY = gql`
  query user($id: Int!) {
    user(id: $id) {
      edges {
        node {
          _id
          firstName
          lastName
          email
        }
      }
    }
  }
`;

const httpLink = createHttpLink({
  uri: GRAPHQL
});

const authLink = setContext((_, { headers }) => {
  // eslint-disable-next-line
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  };
});
// this disable cache
const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'network-only',
    errorPolicy: 'ignore'
  },
  query: {
    fetchPolicy: 'network-only',
    errorPolicy: 'all'
  }
};

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  defaultOptions
});

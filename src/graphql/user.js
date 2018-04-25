import gql from 'graphql-tag';
import { userList, userDetail } from './fragments';

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
        ...userList
      }
    }
  }
  ${userList}
`;

export const EDIT_USER_MUTATION = gql`
  mutation editUserByIdMutation($id: Int!, $data: userInput!) {
    editUserById(input: { id: $id, data: $data }) {
      response {
        ...userDetail
      }
    }
  }
  ${userDetail}
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
          ...userList
        }
      }
    }
  }
  ${userList}
`;

export const USER_BY_ID_QUERY = gql`
  query user($id: Int!) {
    user(id: $id) {
      edges {
        node {
          ...userDetail
        }
      }
    }
  }
  ${userDetail}
`;

export const VIEWER_QUERY = gql`
  query {
    viewer {
      edges {
        node {
          ...userDetail
        }
      }
    }
  }
  ${userDetail}
`;

export const EDIT_VIEWER_MUTATION = gql`
  mutation editViewerMutation($data: viewerInput!) {
    editViewer(input: { data: $data }) {
      response {
        ...userDetail
      }
    }
  }
  ${userDetail}
`;

export const SET_PWD_MUTATION = gql`
  mutation setPwdMutation($old: String!, $password: String!) {
    setPwd(input: { old: $old, password: $password }) {
      response
    }
  }
`;

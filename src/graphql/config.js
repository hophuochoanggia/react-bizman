import gql from 'graphql-tag';

export const CONFIG_QUERY = gql`
  query config($name: String!) {
    config(name: $name) {
      edges {
        node {
          setting
        }
      }
    }
  }
`;

export const CONFIG_MUTATION_BY_NAME = gql`
  mutation editConfigByName($name: String!, $data: configInput!) {
    editConfigByName(input: { name: $name, data: $data }) {
      response {
        setting
      }
    }
  }
`;

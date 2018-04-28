import gql from 'graphql-tag';

export const EVENTTYPES_QUERY = gql`
  {
    eventTypes {
      edges {
        node {
          _id
          name
          description
          metadata
        }
      }
    }
  }
`;

export const EVENTTYPE_BY_ID_QUERY = gql`
  query eventType($id: Int!) {
    eventType(id: $id) {
      edges {
        node {
          _id
          name
          metadata
          description
        }
      }
    }
  }
`;

export const CREATE_EVENTTYPE_MUTATION = gql`
  mutation createEventTypeMutation($input: createEventTypeInput!) {
    createEventType(input: $input) {
      response {
        _id
        name
        metadata
        description
      }
    }
  }
`;

export const EDIT_EVENTTYPE_MUTATION = gql`
  mutation editEventTypeByIdMutation($id: Int!, $data: eventTypeInput!) {
    editEventTypeById(input: { id: $id, data: $data }) {
      response {
        _id
        name
        metadata
        description
      }
    }
  }
`;

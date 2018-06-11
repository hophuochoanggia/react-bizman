import gql from 'graphql-tag';
import { eventList, eventDetail } from './fragments';

// eslint-disable-next-line
export const CREATE_EVENT_MUTATION = gql`
  mutation createEventMutation($input: createEventInput!) {
    createEvent(input: $input) {
      response {
        ...eventList
      }
    }
  }
  ${eventList}
`;

export const FINISH_STUDY_TASK_MUTATION = gql`
  mutation finishStudyTaskMutation($id: Int!, $taskId: Int!, $date: String!) {
    finishStudyTask(input: { id: $id, taskId: $taskId, date: $date }) {
      response {
        data
      }
    }
  }
`;

export const EDIT_EVENT_MUTATION = gql`
  mutation editEventByIdMutation($id: Int!, $data: eventInput!) {
    editEventById(input: { id: $id, data: $data }) {
      response {
        ...eventList
      }
    }
  }
  ${eventList}
`;

export const EVENT_BY_ID_QUERY = gql`
  query event($id: Int!) {
    event(id: $id) {
      edges {
        node {
          ...eventDetail
        }
      }
    }
  }
  ${eventDetail}
`;

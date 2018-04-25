import gql from 'graphql-tag';
import { patientList, patientDetail } from './fragments';

export const CREATE_PATIENT_MUTATION = gql`
  mutation createPatientMutation($input: createPatientInput!) {
    createPatient(input: $input) {
      response {
        ...patientList
      }
    }
  }
  ${patientList}
`;

export const PATIENTS_QUERY = gql`
  query {
    patients {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      edges {
        node {
          ...patientList
        }
      }
    }
  }
  ${patientList}
`;

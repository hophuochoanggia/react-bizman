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

export const EDIT_PATIENT_MUTATION = gql`
  mutation editPatientByIdMutation($id: Int!, $data: patientInput!) {
    editPatientById(input: { id: $id, data: $data }) {
      response {
        fullName
      }
    }
  }
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

export const PATIENT_BY_LICENSE_QUERY = gql`
  query patient($drivingLicense: String!) {
    patient(drivingLicense: $drivingLicense) {
      edges {
        node {
          ...patientDetail
        }
      }
    }
  }
  ${patientDetail}
`;

export const PATIENT_BY_ID_QUERY = gql`
  query patient($id: Int!) {
    patient(id: $id) {
      edges {
        node {
          ...patientDetail
        }
      }
    }
  }
  ${patientDetail}
`;

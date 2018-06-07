import gql from 'graphql-tag';
import { referralDetail } from './fragments';

// eslint-disable-next-line
export const CREATE_REFERRAL_MUTATION = gql`
  mutation createReferralMutation($input: createReferralInput!) {
    createReferral(input: $input) {
      response {
        _id
      }
    }
  }
`;

export const EDIT_REFERRAL_BY_ID_MUTATION = gql`
  mutation editReferralByIdMutation($id: Int!, $data: referralInput!) {
    editReferralById(input: { id: $id, data: $data }) {
      response {
        _id
      }
    }
  }
`;

export const DELETE_REFERRAL_BY_ID_MUTATION = gql`
  mutation deleteReferralByIdMutation($id: Int!) {
    deleteReferral(input: { id: $id }) {
      response
    }
  }
`;

export const REFERRALS_QUERY = gql`
  query {
    referrals {
      edges {
        node {
          ...referralDetail
        }
      }
    }
  }
  ${referralDetail}
`;

export const REFERRAL_BY_ID_QUERY = gql`
  query referral($id: Int!) {
    referral(id: $id) {
      edges {
        node {
          ...referralDetail
        }
      }
    }
  }
  ${referralDetail}
`;

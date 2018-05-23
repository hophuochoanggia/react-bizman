import gql from 'graphql-tag';

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

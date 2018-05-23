import gql from 'graphql-tag';
import { referralDetail } from './fragments';

export const VIEWER_REFERRAL_LIST = gql`
  {
    viewer {
      edges {
        node {
          referrals {
            edges {
              node {
                _id
                status
                fullName
                email
              }
            }
          }
        }
      }
    }
  }
`;

export const VIEWER_REFERRAL_BY_ID = gql`
  query users($id: Int!) {
    viewer {
      edges {
        node {
          referrals(id: $id) {
            edges {
              node {
                ...referralDetail
              }
            }
          }
        }
      }
    }
  }
  ${referralDetail}
`;

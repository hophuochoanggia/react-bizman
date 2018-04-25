import gql from 'graphql-tag';

const fragments = {};
fragments.userDetail = gql`
  fragment userDetail on user {
    _id
    username
    firstName
    lastName
    address
    address2
    isMale
    suburb
    state
    workPhone
    homePhone
    mobile
    fax
    email
    email2
    providerNo
    role
  }
`;
fragments.userList = gql`
  fragment userList on user {
    _id
    firstName
    lastName
    email
  }
`;

fragments.patientList = gql`
  fragment patientList on patient {
    _id
    firstName
    lastName
    email
  }
`;
module.exports = fragments;

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
    fullName
    email
  }
`;

fragments.patientDetail = gql`
  fragment patientDetail on patient {
    _id
    birthday
    firstName
    lastName
    address
    address2
    suburb
    state
    avatarUrl
    isMale
    workPhone
    homePhone
    mobile
    fax
    email
    medicare
    drivingLicense
    dva
    dvaType
    consultant {
      _id
      fullName
    }
  }
`;

fragments.patientList = gql`
  fragment patientList on patient {
    _id
    fullName
    email
    birthday
  }
`;
module.exports = fragments;

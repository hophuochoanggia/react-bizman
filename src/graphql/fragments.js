import gql from 'graphql-tag';

const fragments = {};

fragments.eventDetail = gql`
  fragment eventDetail on event {
    _id
    status
    data
    inactiveReason {
      description
    }
    type {
      name
    }
    users {
      edges {
        node {
          fullName
          role
        }
      }
    }
    createdAt
  }
`;

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
    fullName
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
    drivingLicense
    dva
    dvaType
    events {
      edges {
        node {
          ...eventDetail
        }
      }
    }
  }
  ${fragments.eventDetail}
`;

fragments.patientList = gql`
  fragment patientList on patient {
    _id
    fullName
    email
    birthday
  }
`;

fragments.eventList = gql`
  fragment eventList on event {
    _id
    status
    data
    createdAt
  }
`;

fragments.referralDetail = gql`
  fragment referralDetail on referral {
    _id
    status
    birthday
    firstName
    lastName
    fullName
    mobile
    isMale
    email
    drivingLicense
    data
    doctor {
      firstName
      lastName
    }
  }
`;

module.exports = fragments;

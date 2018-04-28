import React from 'react';
import { withStateHandlers, compose } from 'recompose';
import { compose as apolloCompose, graphql } from 'react-apollo';
import moment from 'moment';

import PatientForm from '../../_components/PatientForm';
import { withSpinnerError, combineFetching } from '../../_components/HOC';
import formExtract from '../../utils/formExtract';
import { PATIENT_BY_ID_QUERY, EDIT_PATIENT_MUTATION } from '../../graphql/patient';
import { USERS_QUERY } from '../../graphql/user';
import toast from '../../utils/toast';
import { patientFields } from '../../utils/formFields';

const EditPatient = props => <PatientForm {...props} />;

const WithCombineFetching = combineFetching(['patient', 'consultants']);

const WithState = withStateHandlers(
  ({ patient: { patient }, match, editPatient }) => ({
    id: match.params.id,
    spinner: false,
    birthday: moment(),
    consultant: patient.edges[0].node.consultant._id,
    form: patient.edges[0].node,
    editPatient
  }),
  {
    handleSpinner: ({ spinner }) => () => ({ spinner: !spinner }),
    handleBirthday: () => date => ({ birthday: date }),
    handleSubmit: ({ id, birthday, editPatient }) => (e, handleSpinner) => {
      e.preventDefault();
      const data = formExtract(e, patientFields);
      data.consultantId = parseInt(data.consultantId, 10);
      if (!birthday) {
        return toast.error('Please select a birthday');
      }
      // eslint-disable-next-line
      if (isNaN(data.consultantId)) {
        return toast.error('Please select a consultant');
      }
      data.birthday = birthday.format();
      console.log(data);
      handleSpinner();
      editPatient({ variables: { id, data } })
        .then(({ data: { editPatientById: { response: { fullName } } } }) => {
          toast.success(`Patient ${fullName} updated`);
        })
        .catch(({ message }) => {
          toast.error(message);
        })
        .finally(handleSpinner);
    }
  }
);

const WithGraphQL = apolloCompose(
  graphql(EDIT_PATIENT_MUTATION, {
    name: 'editPatient'
  }),
  graphql(PATIENT_BY_ID_QUERY, {
    options: ({ match: { params: { id } } }) => ({
      variables: {
        id
      }
    }),
    name: 'patient'
  }),
  graphql(USERS_QUERY, {
    options: () => ({
      variables: {
        role: 'CONSULTANT'
      }
    }),
    name: 'consultants'
  })
);

export default compose(WithGraphQL, WithCombineFetching, withSpinnerError, WithState)(EditPatient);

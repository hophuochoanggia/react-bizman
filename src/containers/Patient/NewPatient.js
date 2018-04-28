import React from 'react';
import { graphql, compose as apolloCompose } from 'react-apollo';
import { compose, withStateHandlers } from 'recompose';
import moment from 'moment';

import PatientForm from '../../_components/PatientForm';
import { patientFields } from '../../utils/formFields';
import formExtract from '../../utils/formExtract';
import { CREATE_PATIENT_MUTATION } from '../../graphql/patient';
import { USERS_QUERY } from '../../graphql/user';
import toast from '../../utils/toast';
import capitalize from '../../utils/capitalize';
import { withSpinnerError, combineFetching } from '../../_components/HOC';

const NewPatient = withSpinnerError(props => <PatientForm {...props} />);

const WithCombineFetching = combineFetching(['consultants']);

const WithState = withStateHandlers(
  ({ createPatient, history }) => ({
    spinner: false,
    createPatient,
    history,
    birthday: moment()
  }),
  {
    handleSpinner: ({ spinner }) => () => ({ spinner: !spinner }),
    handleBirthday: () => date => ({ birthday: date }),
    handleSubmit: ({ createPatient, history, birthday }) => (e, handleSpinner) => {
      e.preventDefault();
      const input = formExtract(e, patientFields);
      input.consultantId = parseInt(input.consultantId, 10);
      if (!birthday) {
        return toast.error('Please select a birthday');
      }
      // eslint-disable-next-line
      if (isNaN(input.consultantId)) {
        return toast.error('Please select a consultant');
      }
      input.birthday = birthday.format();
      handleSpinner();
      createPatient({ variables: { input } })
        .then(({ data: { createPatient: { response: { fullName } } } }) => {
          toast.success(`Patient ${capitalize(fullName)} created`);
          history.push('/patient');
        })
        .catch(error => {
          console.log(error);
          toast.error(error.message);
          handleSpinner();
        });
    }
  }
);

const WithGraphQL = apolloCompose(
  graphql(CREATE_PATIENT_MUTATION, {
    name: 'createPatient'
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

export default compose(WithGraphQL, WithCombineFetching, withSpinnerError, WithState)(NewPatient);

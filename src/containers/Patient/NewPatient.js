import React from 'react';
import { graphql, compose } from 'react-apollo';
import { withStateHandlers } from 'recompose';
import PatientForm from '../../_components/PatientForm';
import { patientFields } from '../../utils/formFields';
import formExtract from '../../utils/formExtract';
import { CREATE_PATIENT_MUTATION, USERS_QUERY } from '../../graphql';
import toast from '../../utils/toast';
import capitalize from '../../utils/capitalize';
import withSpinnerError from '../../_components/HOC';

const NewPatient = withSpinnerError(props => <PatientForm {...props} />);

const withState = withStateHandlers(
  ({ createPatient, history, birthday }) => ({
    spinner: false,
    createPatient,
    history,
    birthday
  }),
  {
    handleSpinner: ({ spinner }) => () => ({ spinner: !spinner }),
    handleBirthday: () => date => ({ birthday: date }),
    handleSubmit: ({ createPatient, history, birthday }) => (e, handleSpinner) => {
      e.preventDefault();
      const input = formExtract(e, patientFields);
      input.consultantId = parseInt(input.consultantId, 10);
      if (isNaN(input.consultantId)) {
        return toast.error('Please select a consultant');
      }
      input.birthday = birthday.format();
      createPatient({ variables: { input } })
        .then(({ data: { createPatient: { response: { firstName, lastName } } } }) => {
          toast.success(`Patient "${capitalize(firstName)} ${lastName.toUpperCase()}" created`);
          history.push('/patient');
        })
        .catch(({ message }) => {
          toast.error(message);
          handleSpinner();
        });
    }
  }
)(NewPatient);

const withGraphQL = compose(
  graphql(CREATE_PATIENT_MUTATION, {
    name: 'createPatient'
  }),
  graphql(USERS_QUERY, {
    options: () => ({
      variables: {
        role: 'CONSULTANT'
      }
    })
  })
)(withState);

export default withGraphQL;

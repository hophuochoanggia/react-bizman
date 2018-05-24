import React from 'react';
import { graphql } from 'react-apollo';
import { compose, withState, withHandlers } from 'recompose';

import PatientForm from '../../_components/Form/PatientForm';
import { CREATE_PATIENT_MUTATION } from '../../graphql/patient';
import toast from '../../utils/toast';
import ControlForm from '../../_components/HOC/ControlForm';
import ControlSpinner from '../../_components/HOC/ControlSpinner';

const NewPatient = props => <PatientForm {...props} />;

const WithSubmit = compose(
  graphql(CREATE_PATIENT_MUTATION, {
    options: ({ input }) => ({
      variables: {
        input
      }
    })
  }),
  withHandlers({
    handleSubmit: ({ mutate, history, handleSpinner }) => () => {
      handleSpinner();
      mutate()
        .then(() => {
          toast.success('Success');
          history.push('/patient');
        })
        .catch(e => {
          toast.error(e.message);
          handleSpinner();
        });
    }
  })
);

export default compose(ControlForm, ControlSpinner, WithSubmit)(NewPatient);

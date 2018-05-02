import React from 'react';
import { graphql } from 'react-apollo';
import { compose, withState, withHandlers } from 'recompose';

import PatientForm from '../../_components/PatientForm';
import { CREATE_PATIENT_MUTATION } from '../../graphql/patient';
import toast from '../../utils/toast';

const NewPatient = props => <PatientForm {...props} />;

export const WithState = compose(
  withState(
    'input',
    'setInput',
    ({ data }) =>
      (data
        ? { ...data.patient.edges[0].node, consultantId: data.patient.edges[0].node.consultant._id }
        : {})
  ),
  withState('spinner', 'setSpinner', false),
  withHandlers({
    handleSpinner: ({ spinner, setSpinner }) => () => {
      setSpinner(!spinner);
    },
    handleInput: ({ input, setInput }) => key => value => {
      setInput({ ...input, [key]: value });
    }
  })
);

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

export default compose(WithState, WithSubmit)(NewPatient);

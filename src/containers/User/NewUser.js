import React from 'react';
import { compose, mapProps, withHandlers } from 'recompose';
import { graphql } from 'react-apollo';

import UserForm from '../../_components/Form/UserForm';
import { CREATE_USER_MUTATION } from '../../graphql/user';
import toast from '../../utils/toast';

import ControlForm from '../../_components/HOC/ControlForm';
import ControlSpinner from '../../_components/HOC/ControlSpinner';

export const getInput = mapProps(props => ({
  ...props,
  input: props.data ? props.data.user.edges[0].node : { isMale: true }
}));

export const enhance = compose(ControlForm, ControlSpinner);

export default compose(
  getInput,
  enhance,
  graphql(CREATE_USER_MUTATION),
  withHandlers({
    handleSubmit: ({
      input, mutate, history, handleSpinner
    }) => () => {
      handleSpinner();
      mutate({ variables: { input } })
        .then(({ data: { createUser: { response: { fullName } } } }) => {
          toast.success(`User ${fullName} created`);
          history.push('/user');
        })
        .catch(({ message }) => {
          toast.error(message.split('GraphQL error: ')[1]);
          handleSpinner();
        });
    }
  })
)(UserForm);

import React from 'react';
import { withStateHandlers } from 'recompose';
import { Mutation } from 'react-apollo';
import PropTypes from 'prop-types';
import { Form } from 'reactstrap';

import UserFormContent from '../components/UserFormContent';
import formExtract from '../utils/formExtract';
import { CREATE_USER_MUTATION } from '../graphql';
import toast from '../utils/toast';
import capitalize from '../utils/capitalize';

const NewUser = ({
  handleSpinner, spinner, handleSubmit, history
}) => (
  <Mutation mutation={CREATE_USER_MUTATION}>
    {createUser => (
      <Form
        className="animated fadeIn"
        onSubmit={e => handleSubmit(e, createUser, handleSpinner, history)}
      >
        <UserFormContent spinner={spinner} />
      </Form>
    )}
  </Mutation>
);

NewUser.propTypes = {
  spinner: PropTypes.bool.isRequired,
  handleSpinner: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

export default withStateHandlers(
  ({ initial = false }) => ({
    spinner: initial
  }),
  {
    handleSpinner: ({ spinner }) => () => ({ spinner: !spinner }),
    handleSubmit: () => (e, createUser, handleSpinner, history) => {
      e.preventDefault();
      const fields = [
        'username',
        'password',
        'firstName',
        'lastName',
        'address',
        'address2',
        'isMale',
        'suburb',
        'state',
        'workPhone',
        'homePhone',
        'mobilePhone',
        'fax',
        'email',
        'email2',
        'providerNo',
        'role'
      ];
      const input = formExtract(e, fields);
      handleSpinner();
      createUser({ variables: { input } })
        .then(({ data: { createUser: { response: { firstName, lastName } } } }) => {
          toast.success(`User "${capitalize(firstName)} ${lastName.toUpperCase()}" created`);
          history.push('/user');
        })
        .catch(({ message }) => {
          toast.error(message.split(':')[1]);
          handleSpinner();
        });
    }
  }
)(NewUser);

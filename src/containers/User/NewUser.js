import React from 'react';
import { withStateHandlers } from 'recompose';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import { Form } from 'reactstrap';

import UserForm from '../../_components/UserForm';
import formExtract from '../../utils/formExtract';
import { CREATE_USER_MUTATION } from '../../graphql/user';
import toast from '../../utils/toast';
import capitalize from '../../utils/capitalize';
import { userFields } from '../../utils/formFields';

const NewUser = ({
  handleSpinner, spinner, handleSubmit, history, createUser
}) => (
  <Form
    className="animated fadeIn"
    onSubmit={e => handleSubmit(e, createUser, handleSpinner, history)}
  >
    <UserForm spinner={spinner} />
  </Form>
);

const withGraphQL = graphql(CREATE_USER_MUTATION, {
  name: 'createUser'
})(NewUser);

NewUser.propTypes = {
  spinner: PropTypes.bool.isRequired,
  handleSpinner: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  createUser: PropTypes.func.isRequired,
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
      const input = formExtract(e, userFields);
      handleSpinner();
      createUser({ variables: { input } })
        .then(({ data: { createUser: { response: { firstName, lastName } } } }) => {
          toast.success(`User "${capitalize(firstName)} ${lastName.toUpperCase()}" created`);
          history.push('/user');
        })
        .catch(({ message }) => {
          toast.error(message);
          handleSpinner();
        });
    }
  }
)(withGraphQL);

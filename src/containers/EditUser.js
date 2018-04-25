import React from 'react';
import { withStateHandlers } from 'recompose';
import { compose, graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import { Form } from 'reactstrap';

import UserForm from '../_components/UserForm';
import withSpinnerError from '../_components/HOC';
import formExtract from '../utils/formExtract';
import { USER_BY_ID_QUERY, EDIT_USER_MUTATION } from '../graphql';
import toast from '../utils/toast';
import { userFields } from '../utils/formFields';

const EditUser = withSpinnerError(({
  handleSpinner, spinner, handleSubmit, data, editUser, match: { params: { id } }
}) => (
  <Form className="animated fadeIn" onSubmit={e => handleSubmit(e, id, editUser, handleSpinner)}>
    <UserForm spinner={spinner} input={data.user.edges[0].node} />
  </Form>
));

EditUser.propTypes = {
  spinner: PropTypes.bool.isRequired,
  handleSpinner: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  editUser: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const withGraphQL = compose(
  graphql(EDIT_USER_MUTATION, {
    name: 'editUser'
  }),
  graphql(USER_BY_ID_QUERY, {
    options: ({ match: { params: { id } } }) => ({
      variables: {
        id
      }
    })
  })
)(EditUser);

export default withStateHandlers(
  ({ initial = false }) => ({
    spinner: initial
  }),
  {
    handleSpinner: ({ spinner }) => () => ({ spinner: !spinner }),
    handleSubmit: () => (e, id, editUser, handleSpinner) => {
      e.preventDefault();
      const data = formExtract(e, userFields);
      handleSpinner();
      editUser({ variables: { id, data } })
        .then(({ data: { editUserById: { response: { firstName, lastName } } } }) => {
          toast.success(`User "${firstName} ${lastName}" updated`);
        })
        .catch(({ message }) => {
          toast.error(message.split('GraphQL error: ')[1]);
        })
        .finally(handleSpinner);
    }
  }
)(withGraphQL);

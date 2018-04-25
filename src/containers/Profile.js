import React from 'react';
import { withStateHandlers } from 'recompose';
import { compose, graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import { Form } from 'reactstrap';

import ProfileForm from '../_components/ProfileForm';
import PasswordForm from '../_components/PasswordForm';
import withSpinnerError from '../_components/HOC';
import formExtract from '../utils/formExtract';
import { VIEWER_QUERY, EDIT_VIEWER_MUTATION, SET_PWD_MUTATION } from '../graphql';
import toast from '../utils/toast';
import { viewerFields, passwordFields } from '../utils/formFields';

const Profile = withSpinnerError(props => {
  const {
    handleSubmit, editViewer, setPwd, handleSpinner, handlePassword
  } = props;
  return (
    <div className="animated fadeIn">
      <Form onSubmit={e => handleSubmit(e, editViewer, handleSpinner)}>
        <ProfileForm {...props} />
      </Form>
      <Form className="animated fadeIn" onSubmit={e => handlePassword(e, setPwd, handleSpinner)}>
        <PasswordForm {...props} />
      </Form>
    </div>
  );
});

const withGraphQL = compose(
  graphql(EDIT_VIEWER_MUTATION, {
    name: 'editViewer'
  }),
  graphql(SET_PWD_MUTATION, {
    name: 'setPwd'
  }),
  graphql(VIEWER_QUERY)
)(Profile);

Profile.propTypes = {
  spinner: PropTypes.bool.isRequired,
  handleSpinner: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  editViewer: PropTypes.func.isRequired,
  setPwd: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

export default withStateHandlers(
  () => ({
    spinner: false
  }),
  {
    handleSpinner: ({ spinner }) => () => ({ spinner: !spinner }),
    handleSubmit: () => (e, mutate, handleSpinner) => {
      e.preventDefault();
      const data = formExtract(e, viewerFields);
      handleSpinner();
      mutate({ variables: { data } })
        .then(() => {
          toast.success('Profile updated');
        })
        .catch(({ message }) => {
          toast.error(message);
        })
        .finally(handleSpinner);
    },
    handlePassword: () => (e, mutate, handleSpinner) => {
      e.preventDefault();
      const { old, password, confirm } = formExtract(e, passwordFields);
      if (password !== confirm) {
        toast.error('Password does not match!!');
      } else {
        handleSpinner();
        mutate({ variables: { old, password } })
          .then(() => {
            toast.success('Password updated');
          })
          .catch(({ message }) => {
            toast.error(message);
          })
          .finally(handleSpinner);
      }
    }
  }
)(withGraphQL);

import React from 'react';
import { compose, mapProps, withHandlers, withState } from 'recompose';
import { graphql } from 'react-apollo';

import ProfileForm from '../../_components/Form/ProfileForm';
import PasswordForm from '../../_components/Form/PasswordForm';
import WithSpinnerError from '../../_components/HOC/SpinnerError';
import { enhance } from './NewUser';

import { VIEWER_QUERY, EDIT_VIEWER_MUTATION, SET_PWD_MUTATION } from '../../graphql/user';
import toast from '../../utils/toast';

const Profile = props => (
  <div className="animated fadeIn">
    <ProfileForm {...props} />
    <PasswordForm {...props} />
  </div>
);

export const getViewer = mapProps(props => ({
  ...props,
  input: props.data.viewer.edges[0].node
}));

export default compose(
  graphql(VIEWER_QUERY),
  WithSpinnerError,
  getViewer,
  enhance,
  graphql(EDIT_VIEWER_MUTATION, {
    name: 'editViewer'
  }),
  graphql(SET_PWD_MUTATION, {
    name: 'setPwd'
  }),
  withState('passwordInput', 'setPassword', {
    old: '',
    password: '',
    confirm: ''
  }),
  withHandlers({
    handlePasswordForm: ({ passwordInput, setPassword }) => key => event => {
      setPassword({
        ...passwordInput,
        [key]: event.target.value
      });
    },
    handlePassword: ({
      handleSpinner,
      setPwd,
      passwordInput: { old, password, confirm }
    }) => () => {
      if (!confirm || password !== confirm) {
        toast.error('Password does not match!!');
      } else {
        handleSpinner();
        setPwd({ variables: { old, password } })
          .then(() => {
            toast.success('Password updated');
          })
          .catch(({ message }) => {
            toast.error(message);
          })
          .finally(handleSpinner);
      }
    },
    handleEditViewer: ({ input, editViewer, handleSpinner }) => () => {
      handleSpinner();
      const data = { ...input };
      delete data._id;
      delete data.__typename;
      delete data.username;
      delete data.role;
      Object.keys(data).forEach(key => data[key] == null && delete data[key]);
      editViewer({ variables: { data } })
        .then(() => {
          toast.success('Profile updated');
        })
        .catch(({ message }) => {
          toast.error(message);
        })
        .finally(handleSpinner);
    }
  })
)(Profile);

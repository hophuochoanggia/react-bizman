import React from 'react';
import { compose, withStateHandlers } from 'recompose';
import { Mutation } from 'react-apollo';
import PropTypes from 'prop-types';
import { Form } from 'reactstrap';

import UserFormContent from '../components/UserFormContent';
import WithQuerySpinnerError from './HOC';
import formExtract from '../utils/formExtract';
import { USER_BY_ID_QUERY, EDIT_USER_MUTATION } from '../graphql';
import toast from '../utils/toast';
import capitalize from '../utils/capitalize';

const EditUser = ({
  handleSpinner, spinner, handleSubmit, history, match
}) => (
  <Mutation mutation={EDIT_USER_MUTATION}>
    {editUser => (
      <Form
        className="animated fadeIn"
        onSubmit={e => handleSubmit(e, editUser, handleSpinner, history)}
      >
        {console.log(match)}
        <UserFormContent spinner={spinner} />
      </Form>
    )}
  </Mutation>
);

EditUser.propTypes = {
  spinner: PropTypes.bool.isRequired,
  handleSpinner: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

const enhance = <WithQuerySpinnerError Comp={EditUser} query={USER_BY_ID_QUERY} />;
export default enhance;

// export default withStateHandlers(
//  ({ initial = false }) => ({
//    spinner: initial
//  }),
//  {
//    handleSpinner: ({ spinner }) => () => ({ spinner: !spinner }),
//    handleSubmit: () => (e, createUser, handleSpinner, history) => {
//      e.preventDefault();
//      const fields = [
//        'username',
//        'password',
//        'firstName',
//        'lastName',
//        'address',
//        'address2',
//        'isMale',
//        'suburb',
//        'state',
//        'workPhone',
//        'homePhone',
//        'mobilePhone',
//        'fax',
//        'email',
//        'email2',
//        'providerNo',
//        'role'
//      ];
//      const input = formExtract(e, fields);
//      handleSpinner();
//      createUser({ variables: { input } })
//        .then(({ data: { createUser: { response: { firstName, lastName } } } }) => {
//          toast.success(`User "${capitalize(firstName)} ${lastName.toUpperCase()}" created`);
//          history.push('/user');
//        })
//        .catch(({ message }) => {
//          toast.error(message.split(':')[1]);
//          handleSpinner();
//        });
//    }
//  }
// )(EditUser);

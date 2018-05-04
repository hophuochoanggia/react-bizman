import { compose, withHandlers } from 'recompose';
import { graphql } from 'react-apollo';

import UserForm from '../../_components/Form/UserForm';
import { getInput, enhance } from './NewUser';
import WithSpinnerError from '../../_components/HOC/SpinnerError';
import { USER_BY_ID_QUERY, EDIT_USER_MUTATION } from '../../graphql/user';
import toast from '../../utils/toast';

export default compose(
  graphql(USER_BY_ID_QUERY, {
    options: ({ match: { params: { id } } }) => ({
      variables: {
        id
      }
    })
  }),
  WithSpinnerError,
  getInput,
  enhance,
  graphql(EDIT_USER_MUTATION),
  withHandlers({
    handleSubmit: ({
      match: { params: { id } }, input, mutate, handleSpinner
    }) => () => {
      handleSpinner();
      delete input._id;
      delete input.__typename;
      mutate({ variables: { id, data: input } })
        .then(() => {
          toast.success('User updated');
        })
        .catch(({ message }) => {
          toast.error(message);
        })
        .finally(handleSpinner);
    }
  })
)(UserForm);

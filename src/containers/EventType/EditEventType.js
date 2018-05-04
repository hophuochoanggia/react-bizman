import { compose, withHandlers } from 'recompose';
import { graphql } from 'react-apollo';
import toast from '../../utils/toast';
import { EVENTTYPE_BY_ID_QUERY, EDIT_EVENTTYPE_MUTATION } from '../../graphql/eventType';
import { withSpinnerError } from '../../_components/HOC';
import { WithStateHandlers } from './NewEventType';
import EventTypeForm from '../../_components/EventTypeForm';

const WithSubmit = withHandlers({
  handleSubmit: ({
    mutate, handleSpinner, input, match: { params: { id } }
  }) => () => {
    handleSpinner();
    delete input._id;
    delete input.__typename;
    mutate({ variables: { id, data: input } })
      .then(() => {
        toast.success('Success');
      })
      .catch(e => {
        toast.error(e.message);
      })
      .finally(handleSpinner);
  }
});

export default compose(
  graphql(EVENTTYPE_BY_ID_QUERY, {
    options: ({ match: { params: { id } } }) => ({
      variables: {
        id
      }
    })
  }),
  withSpinnerError,
  WithStateHandlers,
  graphql(EDIT_EVENTTYPE_MUTATION, {
    name: 'mutate'
  }),
  WithSubmit
)(EventTypeForm);

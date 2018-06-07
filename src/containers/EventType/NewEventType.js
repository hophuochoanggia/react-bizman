import { compose, withState, withHandlers } from 'recompose';
import { graphql } from 'react-apollo';
import toast from '../../utils/toast';
import { CREATE_EVENTTYPE_MUTATION } from '../../graphql/eventType';
import EventTypeForm from '../../_components/Form/EventTypeForm';

export const WithStateHandlers = compose(
  withState('spinner', 'setSpinner', false),
  withState('input', 'setInput', ({ input }) => input),
  withHandlers({
    handleSpinner: ({ spinner, setSpinner }) => () => {
      setSpinner(!spinner);
    },
    handleInput: ({ input, setInput }) => key => value => {
      setInput({ ...input, [key]: value });
    }
  })
);

const WithSubmit = withHandlers({
  handleSubmit: ({
    input, history, mutate, handleSpinner
  }) => (
    validJSON,
    JSONSchema,
    UISchema
  ) => {
    if (!validJSON) {
      return toast.error('Setting has errors');
    }
    handleSpinner();
    mutate({
      variables: {
        input: {
          ...input,
          setting: {
            JSONSchema,
            UISchema
          }
        }
      }
    })
      .then(() => {
        toast.success('Success');
        history.push('/eventType');
      })
      .catch(e => {
        toast.error(e.message);
        handleSpinner();
      });
  }
});

export default compose(
  WithStateHandlers,
  graphql(CREATE_EVENTTYPE_MUTATION, {
    name: 'mutate'
  }),
  WithSubmit
)(EventTypeForm);

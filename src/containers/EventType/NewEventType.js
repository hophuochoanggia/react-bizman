import { compose, withState, withHandlers } from 'recompose';
import { graphql } from 'react-apollo';
import toast from '../../utils/toast';
import { CREATE_EVENTTYPE_MUTATION } from '../../graphql/eventType';
import EventTypeForm from '../../_components/Form/EventTypeForm';

const defaultSchema = [
  {
    type: 'text',
    title: 'Text field',
    name: 'key1',
    key: Math.random()
      .toString(36)
      .substring(7)
  },
  {
    type: 'text',
    title: 'Text Field',
    name: 'key2',
    key: Math.random()
      .toString(36)
      .substring(7)
  }
];

export const WithStateHandlers = compose(
  withState('spinner', 'setSpinner', false),
  withState(
    'input',
    'setInput',
    ({ data }) =>
      (data ? data.eventType.edges[0].node : { name: null, description: null, schema: defaultSchema })
  ),
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
  handleSubmit: ({ mutate, history, handleSpinner }) => () => {
    handleSpinner();
    mutate()
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
    name: 'mutate',
    options: ({ input }) => ({
      variables: {
        input
      }
    })
  }),
  WithSubmit
)(EventTypeForm);

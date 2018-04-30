import React from 'react';
import { compose, withState, withHandlers } from 'recompose';
import { graphql } from 'react-apollo';
import toast from '../../utils/toast';
import { CREATE_EVENTTYPE_MUTATION } from '../../graphql/eventType';
import EventTypeForm from '../../_components/EventTypeForm';

export const NewEventType = props => <EventTypeForm {...props} />;

const defaultSchema = [
  {
    type: 'text',
    title: 'haha',
    key: Math.random()
      .toString(36)
      .substring(7)
  },
  {
    type: 'text',
    title: 'haha',
    key: Math.random()
      .toString(36)
      .substring(7)
  }
];

export const WithState = compose(
  withState(
    'input',
    'setInput',
    ({ data }) =>
      (data ? data.eventType.edges[0].node : { name: '', description: '', metadata: defaultSchema })
  ),
  withState('spinner', 'setSpinner', false)
);

export const WithHandler = withHandlers({
  handleSpinner: ({ spinner, setSpinner }) => () => {
    setSpinner(!spinner);
  },
  handleInput: ({ input, setInput }) => key => value => {
    setInput({ ...input, [key]: value });
  },
  handleSubmit: ({ mutate, history, handleSpinner }) => () => {
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
  WithState,
  graphql(CREATE_EVENTTYPE_MUTATION, {
    name: 'mutate',
    options: ({ input }) => ({
      variables: {
        input
      }
    })
  }),
  WithHandler
)(NewEventType);

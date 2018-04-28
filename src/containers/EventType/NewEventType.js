import React from 'react';
import { compose, withStateHandlers } from 'recompose';
import { graphql } from 'react-apollo';
import toast from '../../utils/toast';
import { CREATE_EVENTTYPE_MUTATION } from '../../graphql/eventType';
import EventTypeForm from '../../_components/EventTypeForm';
import formExtract from '../../utils/formExtract';
import { eventTypeFields } from '../../utils/formFields';

const NewEventType = props => <EventTypeForm {...props} />;

const formatJSON = s => JSON.stringify(JSON.parse(s), null, 2);
const defaultMetadata = {
  type: 'object',
  properties: {
    title: { type: 'string', title: 'Title', default: 'A new task' },
    done: { type: 'boolean', title: 'Done?', default: false }
  }
};
const WithState = withStateHandlers(
  ({ createEventType }) => ({
    jsonString: JSON.stringify(defaultMetadata, null, 2),
    schema: defaultMetadata,
    spinner: false,
    createEventType
  }),
  {
    handleSpinner: ({ spinner }) => () => ({ spinner: !spinner }),
    handleMetadata: () => input => ({ jsonString: input }),
    handlePreview: ({ jsonString }) => () => {
      try {
        const json = JSON.parse(jsonString);
        return {
          schema: json,
          jsonString: formatJSON(jsonString)
        };
      } catch (e) {
        toast.error(e.message);
      }
    },
    handleSubmit: ({ createEventType, history }) => (e, handleSpinner) => {
      e.preventDefault();
      const input = formExtract(e, eventTypeFields);
      input.metadata = JSON.parse(input.metadata);
      handleSpinner();
      createEventType({ variables: { input } })
        .then(() => {
          toast.success('Event type created');
          history.paush('/eventType');
        })
        .catch(e => {
          toast.error(e.message);
          handleSpinner();
        });
    }
  }
);

export default compose(
  graphql(CREATE_EVENTTYPE_MUTATION, {
    name: 'createEventType'
  }),
  WithState
)(NewEventType);

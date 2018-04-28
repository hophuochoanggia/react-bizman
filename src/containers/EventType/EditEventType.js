import React from 'react';
import { compose, withStateHandlers } from 'recompose';
import { graphql, compose as apolloCompose } from 'react-apollo';
import toast from '../../utils/toast';
import { EVENTTYPE_BY_ID_QUERY, EDIT_EVENTTYPE_MUTATION } from '../../graphql/eventType';
import EventTypeForm from '../../_components/EventTypeForm';
import formExtract from '../../utils/formExtract';
import { eventTypeFields } from '../../utils/formFields';
import { withSpinnerError } from '../../_components/HOC';

const NewEventType = props => <EventTypeForm {...props} />;

const formatJSON = s => JSON.stringify(JSON.parse(s), null, 2);

const WithState = withStateHandlers(
  ({ data: { eventType: { edges } }, editEventType }) => {
    return {
      jsonString: JSON.stringify(edges[0].node.metadata, null, 2),
      schema: edges[0].node.metadata,
      spinner: false,
      editEventType
    };
  },
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
  apolloCompose(
    graphql(EDIT_EVENTTYPE_MUTATION, {
      name: 'editEventType'
    }),
    graphql(EVENTTYPE_BY_ID_QUERY, {
      options: ({ match: { params: { id } } }) => ({
        variables: {
          id
        }
      })
    })
  ),
  withSpinnerError,
  WithState
)(NewEventType);

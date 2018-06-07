import { compose, withHandlers, mapProps } from 'recompose';
import { graphql } from 'react-apollo';
import toast from '../../utils/toast';
import { EVENTTYPE_BY_ID_QUERY, EDIT_EVENTTYPE_MUTATION } from '../../graphql/eventType';
import WithSpinnerError from '../../_components/HOC/SpinnerError';
import { WithStateHandlers } from './NewEventType';
import EventTypeForm from '../../_components/Form/EventTypeForm';

const WithSubmit = withHandlers({
  handleSubmit: ({
    input, mutate, handleSpinner, match: { params: { id } }
  }) => (
    validJSON,
    JSONSchema,
    UISchema
  ) => {
    if (!validJSON) {
      return toast.error('Setting has errors');
    }
    handleSpinner();
    const data = { ...input, setting: { JSONSchema, UISchema } };
    delete data._id;
    delete data.__typename;
    mutate({ variables: { id, data } })
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
  WithSpinnerError,
  mapProps(props => ({
    ...props,
    input: props.data.eventType.edges[0].node,
    JSONSchema: props.data.eventType.edges[0].node.setting.JSONSchema,
    UISchema: props.data.eventType.edges[0].node.setting.UISchema
  })),
  WithStateHandlers,
  graphql(EDIT_EVENTTYPE_MUTATION, {
    name: 'mutate'
  }),
  WithSubmit
)(EventTypeForm);

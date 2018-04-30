import { compose } from 'recompose';
import { graphql } from 'react-apollo';
import { EVENTTYPE_BY_ID_QUERY, EDIT_EVENTTYPE_MUTATION } from '../../graphql/eventType';
import { withSpinnerError } from '../../_components/HOC';
import { NewEventType, WithState, WithHandler } from './NewEventType';

export default compose(
  WithState,
  graphql(EVENTTYPE_BY_ID_QUERY, {
    options: ({ match: { params: { id } } }) => ({
      variables: {
        id
      }
    })
  }),
  withSpinnerError,
  graphql(EDIT_EVENTTYPE_MUTATION, {
    name: 'mutate',
    options: ({ match: { params: { id } }, input }) => ({
      variables: {
        id,
        data: input
      }
    })
  }),
  WithHandler
)(NewEventType);

import { compose } from 'recompose';
import { graphql, compose as apolloCompose } from 'react-apollo';
import { EVENTTYPE_BY_ID_QUERY, EDIT_EVENTTYPE_MUTATION } from '../../graphql/eventType';
import { withSpinnerError } from '../../_components/HOC';
import { EventTypeWithState } from './NewEventType';

export default compose(
  apolloCompose(
    graphql(EDIT_EVENTTYPE_MUTATION, {
      name: 'mutate'
    }),
    graphql(EVENTTYPE_BY_ID_QUERY, {
      options: ({ match: { params: { id } } }) => ({
        variables: {
          id
        }
      })
    })
  ),
  withSpinnerError
)(EventTypeWithState);

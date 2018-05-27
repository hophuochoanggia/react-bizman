import { compose, mapProps, withHandlers } from 'recompose';
import { graphql } from 'react-apollo';

import toast from '../../utils/toast';
import WithSpinnerError from '../../_components/HOC/SpinnerError';
import ControlForm from '../../_components/HOC/ControlForm';
import ControlSpinner from '../../_components/HOC/ControlSpinner';
import CombineFinishFetching from '../../_components/HOC/CombineFetching';

import EventForm from '../../_components/Form/EventForm';

import { EVENTTYPE_BY_ID_QUERY } from '../../graphql/eventType';
import { USERS_QUERY } from '../../graphql/user';
import { CREATE_EVENT_MUTATION } from '../../graphql/event';

const QueryUserByRole = role =>
  graphql(USERS_QUERY, {
    options: () => ({
      variables: {
        role
      }
    }),
    name: role
  });

const roles = ['CONSULTANT', 'DOCTOR', 'SPECIALIST', 'DENTIST', 'SCIENTIST'];
const queryProp = ['EVENTTYPE', ...roles];

const QueryUser = roles.map(role => QueryUserByRole(role));

const WithState = compose(
  graphql(EVENTTYPE_BY_ID_QUERY, {
    options: ({ match: { params: { eventTypeId } } }) => ({
      variables: {
        id: eventTypeId
      }
    }),
    name: 'EVENTTYPE'
  }),
  ...QueryUser,
  CombineFinishFetching(queryProp), // consolidate loading state of all into 1
  WithSpinnerError,
  mapProps(props => {
    const dropdownData = {};
    roles.map(role => {
      dropdownData[role] = props[role].users.edges.map(({ node }) => ({
        value: node._id,
        label: node.fullName
      }));
    });
    return {
      ...props,
      ...dropdownData,
      schema: props.EVENTTYPE.eventType.edges[0].node.schema,
      input: { data: {} }
    };
  }),
  ControlForm,
  ControlSpinner,
  graphql(CREATE_EVENT_MUTATION),
  withHandlers({
    handleSubmit: ({
      input,
      history,
      match: { params: { patientId, eventTypeId } },
      mutate,
      handleSpinner
    }) => () => {
      input.patientId = parseInt(patientId, 10);
      input.typeId = parseInt(eventTypeId, 10);
      handleSpinner();
      mutate({ variables: { input } })
        .then(() => {
          history.push(`/patient/${patientId}`);
        })
        .catch(e => {
          toast.error(e.message);
          handleSpinner();
        });
    }
  })
);

export default WithState(EventForm);

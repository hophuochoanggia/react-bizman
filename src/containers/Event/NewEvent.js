import { compose, mapProps, withHandlers } from 'recompose';
import { graphql } from 'react-apollo';

import toast from '../../utils/toast';
import WithSpinnerError from '../../_components/HOC/SpinnerError';
import ControlForm from '../../_components/HOC/ControlForm';
import ControlSpinner from '../../_components/HOC/ControlSpinner';
import CombineFinishFetching from '../../_components/HOC/CombineFetching';

import EventForm from '../../_components/Form/EventForm/';

// import { EVENTTYPE_BY_ID_QUERY } from '../../graphql/eventType';
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

const QueryUser = roles.map(role => QueryUserByRole(role));

export default compose(
  // Fetch User info
  ...QueryUser,
  CombineFinishFetching(roles),
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
      input: { data: {} }
    };
  }),
  // Component State
  ControlForm,
  ControlSpinner,
  // Mutation
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
      input.type = eventTypeId;
      handleSpinner();
      mutate({ variables: { input } })
        .then(() => {
          history.push(`/patient/${patientId}`);
        })
        .catch(e => {
          console.log(e);
          toast.error(e.message);
          handleSpinner();
        });
    }
  })
)(EventForm);

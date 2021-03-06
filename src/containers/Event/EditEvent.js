import { compose, mapProps, withHandlers } from 'recompose';
import { graphql } from 'react-apollo';

import toast from '../../utils/toast';
import WithSpinnerError from '../../_components/HOC/SpinnerError';
import { ControlForm } from '../../_components/HOC/ControlForm';
import ControlSpinner from '../../_components/HOC/ControlSpinner';
import CombineFinishFetching from '../../_components/HOC/CombineFetching';

import EventForm from '../../_components/Form/EventForm';

import { USERS_QUERY } from '../../graphql/user';
import { EVENT_BY_ID_QUERY, EDIT_EVENT_MUTATION } from '../../graphql/event';

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
const queryProp = ['EVENT', ...roles];

const QueryUser = roles.map(role => QueryUserByRole(role));

const WithState = compose(
  graphql(EVENT_BY_ID_QUERY, {
    options: ({ match: { params: { id } } }) => ({
      variables: {
        id
      }
    }),
    name: 'EVENT'
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
    const currentUser = {};
    props.EVENT.event.edges[0].node.users.edges.map(({ node }) => {
      const propsName = node.role.toLowerCase();
      currentUser[propsName] = node._id;
    });
    return {
      ...props,
      ...dropdownData,
      schema: props.EVENT.event.edges[0].node.type.schema,
      input: {
        ...props.EVENT.event.edges[0].node,
        ...currentUser
      }
    };
  }),
  ControlForm,
  ControlSpinner,
  graphql(EDIT_EVENT_MUTATION),
  withHandlers({
    handleSubmit: ({
      input, history, match: { params: { id } }, mutate, handleSpinner
    }) => () => {
      const data = { ...input };
      delete data.__typename;
      delete data.type;
      delete data.users;
      handleSpinner();
      mutate({ variables: { id, data } })
        .then(() => {
          toast.success('Updated Event');
        })
        .catch(e => {
          toast.error(e.message);
        })
        .finally(handleSpinner);
    }
  })
);

export default WithState(EventForm);

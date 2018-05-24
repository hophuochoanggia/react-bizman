import React from 'react';
import PropTypes from 'prop-types';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import { withState, withHandlers, compose, mapProps } from 'recompose';
import { graphql } from 'react-apollo';
import classnames from 'classnames';

import PatientForm from '../../_components/Form/PatientForm';
import WithSpinnerError from '../../_components/HOC/SpinnerError';
import ControlForm from '../../_components/HOC/ControlForm';
import ControlSpinner from '../../_components/HOC/ControlSpinner';
import RouteGuard from '../../_components/HOC/RouteGuard';
import ReduxCredential from '../../_components/HOC/ReduxCredential';

import { PATIENT_BY_ID_QUERY, EDIT_PATIENT_MUTATION } from '../../graphql/patient';
import toast from '../../utils/toast';
import EventByPatient from '../Event/EventByPatient';

const EditPatient = props => (
  <React.Fragment>
    <Nav tabs>
      <NavItem>
        <NavLink
          className={classnames({
            active: props.tab === 1
          })}
          onClick={() => {
            props.setTab(1);
          }}
        >
          Event
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          className={classnames({
            active: props.tab === 2
          })}
          onClick={() => {
            props.setTab(2);
          }}
        >
          Profile
        </NavLink>
      </NavItem>
    </Nav>
    <TabContent activeTab={props.tab}>
      <TabPane tabId={1}>
        <EventByPatient {...props} />
      </TabPane>
      <TabPane tabId={2}>
        <PatientForm {...props} />
      </TabPane>
    </TabContent>
  </React.Fragment>
);

EditPatient.propTypes = {
  tab: PropTypes.number.isRequired,
  setTab: PropTypes.func.isRequired
};

const WithTab = withState('tab', 'setTab', 1);

const WithSubmit = compose(
  graphql(EDIT_PATIENT_MUTATION),
  withHandlers({
    handleSubmit: ({
      match: { params: { id } }, input, mutate, handleSpinner
    }) => () => {
      const data = { ...input };
      const omitKey = ['_id', '__typename', 'events', 'fullName'];
      omitKey.forEach(element => {
        delete data[element];
      });
      Object.keys(data).map(key => {
        if (data[key] === null) {
          delete data[key];
        }
      });
      handleSpinner();
      mutate({
        variables: {
          id: parseInt(id, 10),
          data
        }
      })
        .then(() => {
          toast.success('Successfully update user');
        })
        .catch(e => {
          toast.error(e.message);
        })
        .finally(handleSpinner);
    }
  })
);

export default compose(
  ReduxCredential,
  RouteGuard,
  graphql(PATIENT_BY_ID_QUERY, {
    options: ({ match: { params: { id } } }) => ({
      variables: {
        id
      }
    })
  }),
  WithSpinnerError,
  mapProps(props => ({ ...props, input: props.data.patient.edges[0].node })),
  ControlForm,
  ControlSpinner,
  WithSubmit,
  WithTab
)(EditPatient);

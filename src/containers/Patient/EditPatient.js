import React from 'react';
import PropTypes from 'prop-types';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import { withState, withHandlers, compose } from 'recompose';
import { graphql } from 'react-apollo';
import classnames from 'classnames';

import { WithState } from './NewPatient';

import PatientForm from '../../_components/PatientForm';
import { withSpinnerError } from '../../_components/HOC';
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
      const omitKey = ['_id', '__typename', 'events'];
      omitKey.forEach(element => {
        delete input[element];
      });
      handleSpinner();
      mutate({
        variables: {
          id,
          data: input
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
  graphql(PATIENT_BY_ID_QUERY, {
    options: ({ match: { params: { id } } }) => ({
      variables: {
        id
      }
    })
  }),
  withSpinnerError,
  WithState,
  WithSubmit,
  WithTab
)(EditPatient);

import PropTypes from 'prop-types';
import { withHandlers, compose, mapProps, withProps } from 'recompose';
import { graphql } from 'react-apollo';

import ComponentsAsTab from '../../_components/ComponentsAsTab';
import EventByPatient from '../Event/EventByPatient';
import PatientForm from '../../_components/Form/PatientForm';

import WithSpinnerError from '../../_components/HOC/SpinnerError';
import ControlForm from '../../_components/HOC/ControlForm';
import ControlSpinner from '../../_components/HOC/ControlSpinner';
import ControlTab from '../../_components/HOC/ControlTab';
import RouteGuard from '../../_components/HOC/RouteGuard';
import ReduxCredential from '../../_components/HOC/ReduxCredential';

import { PATIENT_BY_ID_QUERY, EDIT_PATIENT_MUTATION } from '../../graphql/patient';

import toast from '../../utils/toast';
import omitKeys from '../../utils/omitKeys';

const EditPatient = withProps({
  tabs: [
    {
      name: 'Events',
      Component: EventByPatient
    },
    {
      name: 'Profile',
      Component: PatientForm
    }
  ]
})(ComponentsAsTab);

EditPatient.propTypes = {
  tab: PropTypes.number.isRequired,
  setTab: PropTypes.func.isRequired
};

const WithSubmit = compose(
  graphql(EDIT_PATIENT_MUTATION),
  withHandlers({
    handleSubmit: ({
      match: { params: { id } }, input, mutate, handleSpinner
    }) => () => {
      const keys = ['_id', '__typename', 'events', 'fullName', 'activeEvents', 'inactiveEvents'];
      const data = omitKeys(input, keys);
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
  ControlTab
)(EditPatient);

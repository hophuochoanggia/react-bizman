import React from 'react';
import { graphql } from 'react-apollo';
import { PATIENTS_QUERY } from '../../graphql/patient';
import { withSpinnerError } from '../../_components/HOC';
import PatientList from '../../_components/PatientList';

const enhance = withSpinnerError(({ history, data: { patients: { edges } } }) => (
  <PatientList data={edges} history={history} />
));
export default graphql(PATIENTS_QUERY)(enhance);

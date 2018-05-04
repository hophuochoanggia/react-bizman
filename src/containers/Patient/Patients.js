import React from 'react';
import { graphql } from 'react-apollo';
import { PATIENTS_QUERY } from '../../graphql/patient';
import WithSpinnerError from '../../_components/HOC/SpinnerError';
import PatientList from '../../_components/List/PatientList';

const enhance = WithSpinnerError(({ history, data: { patients: { edges } } }) => (
  <PatientList data={edges} history={history} />
));
export default graphql(PATIENTS_QUERY)(enhance);

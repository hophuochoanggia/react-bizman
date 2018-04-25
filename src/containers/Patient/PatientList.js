import React from 'react';
import { graphql } from 'react-apollo';
import { PATIENTS_QUERY } from '../../graphql/patient';
import withSpinnerError from '../../_components/HOC';
import List from '../../_components/List';

export default graphql(PATIENTS_QUERY)(withSpinnerError(({ data: { patients: { edges } } }) => <List data={edges} />));

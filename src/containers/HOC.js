import React from 'react';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';

import { Spinner, Error } from '../components/common';

const WithQuerySpinnerError = ({
  query, variables, Comp, forwardProps
}) => (
  <Query query={query} variables={variables}>
    {({ loading, error, data }) => {
      if (loading) return <Spinner />;
      if (error) return <Error {...error} />;
      const { edges } = data.users;
      console.log(forwardProps);
      return <Comp {...forwardProps} data={edges} />;
    }}
  </Query>
);

WithQuerySpinnerError.defaultProps = {
  variables: {}
};

WithQuerySpinnerError.propTypes = {
  variables: PropTypes.object,
  forwardProps: PropTypes.object.isRequired,
  query: PropTypes.object.isRequired,
  Comp: PropTypes.func.isRequired
};
export default WithQuerySpinnerError;

import React from 'react';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';

export const Spinner = () => <i className="fa fa-circle-o-notch fa-lg fa-spin mt-4" />;
export const Error = ({ message }) => <div>{message}</div>;
Error.propTypes = {
  message: PropTypes.string.isRequired
};

export const WithQuery = props => {
  const { query, role, Comp } = props;
  return (
    <Query query={query} variables={{ role }}>
      {({ loading, error, data }) => {
        if (loading) return <Spinner />;
        if (error) return <Error {...error} />;
        const { edges } = data.users;
        return <Comp {...props} data={edges} />;
      }}
    </Query>
  );
};

WithQuery.propTypes = {
  query: PropTypes.object.isRequired,
  role: PropTypes.string.isRequired,
  Comp: PropTypes.func.isRequired
};

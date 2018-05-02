import React from 'react';
import { compose, mapProps } from 'recompose';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import Async from 'react-select/lib/Async';

import { withSpinnerError } from '../_components/HOC';
import { USERS_QUERY } from '../graphql/user';

const Dropdown = ({ defaultValue, defaultOptions, handleChange }) => (
  <Async
    name="consultantId"
    defaultValue={defaultValue}
    defaultOptions={defaultOptions}
    onChange={({ value }) => {
      handleChange(value);
    }}
  />
);
Dropdown.defaultProps = {
  defaultValue: undefined
};

Dropdown.propTypes = {
  defaultValue: PropTypes.object,
  defaultOptions: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired
};

const transformProps = mapProps(({
  current, data, name, handleChange
}) => {
  const defaultValue = current ? { value: current._id, label: current.fullName } : null;
  const defaultOptions = data[name].edges.map(el => ({
    value: el.node._id,
    label: el.node.fullName
  }));
  return {
    defaultValue,
    defaultOptions,
    handleChange
  };
});

// eslint-disable-next-line
export const ConsultantDropdown = compose(
  graphql(USERS_QUERY, {
    options: () => ({
      variables: {
        role: 'CONSULTANT'
      }
    })
  }),
  withSpinnerError,
  transformProps
)(Dropdown);

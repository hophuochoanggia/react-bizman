import React from 'react';
import PropTypes from 'prop-types';
import Async from 'react-select/lib/Async';

import WithSpinnerError from '../HOC/SpinnerError';

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

// eslint-disable-next-line
export default WithSpinnerError(Dropdown);

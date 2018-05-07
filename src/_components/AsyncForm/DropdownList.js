import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'reactstrap';

const Dropdown = ({ defaultValue, defaultOptions, handleChange }) => (
  <Input type="select" name="dropdownId" value={defaultValue} onChange={handleChange}>
    <option value={undefined}> -- select an option -- </option>
    {defaultOptions.map(option => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </Input>
);
Dropdown.defaultProps = {
  defaultValue: ''
};

Dropdown.propTypes = {
  defaultValue: PropTypes.any,
  defaultOptions: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired
};

export default Dropdown;

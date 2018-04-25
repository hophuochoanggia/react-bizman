import React from 'react';
import { Input } from 'reactstrap';
import PropTypes from 'prop-types';

const Dropdown = ({ name, data, required }) => (
  <Input type="select" name={name} defaultValue={null} required={required}>
    <option selected value="undefined">
      Please select one
    </option>
    {data.map(({ node }) => (
      <option key={node._id} value={node._id}>
        {node.firstName} {node.lastName}
      </option>
    ))}
  </Input>
);
Dropdown.propTypes = {
  name: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  required: PropTypes.bool.isRequired
};

export default Dropdown;

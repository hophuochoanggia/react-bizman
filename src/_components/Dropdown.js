import React from 'react';
import { mapProps } from 'recompose';
import PropTypes from 'prop-types';
import Async from 'react-select/lib/Async';

const Dropdown = ({ defaultValue, defaultOptions }) => (
  <Async name="consultantId" defaultValue={defaultValue} defaultOptions={defaultOptions} />
);
Dropdown.defaultProps = {
  defaultValue: undefined
};

Dropdown.propTypes = {
  defaultValue: PropTypes.object,
  defaultOptions: PropTypes.array.isRequired
};

const transformProp = () =>
  mapProps(props => {
    const {
      current, data, name, handleChange
    } = props;
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

export default transformProp()(Dropdown);

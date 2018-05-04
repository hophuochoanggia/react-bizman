import React from 'react';
import { compose, mapProps } from 'recompose';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import Async from 'react-select/lib/Async';

import { withSpinnerError } from '../../_components/HOC';
import { EVENTTYPES_QUERY } from '../../graphql/eventType';

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
// export const ConsultantDropdown = compose(
//  graphql(USERS_QUERY, {
//    options: () => ({
//      variables: {
//        role: 'CONSULTANT'
//      }
//    })
//  }),
//  withSpinnerError,
//  mapProps(({ current, data, handleChange }) => {
//    const defaultValue = current ? { value: current._id, label: current.fullName } : null;
//    const defaultOptions = data.user.edges.map(el => ({
//      value: el.node._id,
//      label: el.node.fullName
//    }));
//    return {
//      defaultValue,
//      defaultOptions,
//      handleChange
//    };
//  })
// )(Dropdown);
// eslint-disable-next-line
export const EventTypeDropdown = compose(
  graphql(EVENTTYPES_QUERY),
  withSpinnerError,
  mapProps(({ current, data, handleChange }) => {
    const defaultValue = current ? { value: current._id, label: current.fullName } : null;
    const defaultOptions = data.eventTypes.edges.map(el => ({
      value: el.node._id,
      label: el.node.name
    }));
    return {
      defaultValue,
      defaultOptions,
      handleChange
    };
  })
)(Dropdown);

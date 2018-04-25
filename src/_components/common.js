import React from 'react';
import PropTypes from 'prop-types';

export const Spinner = () => <i className="fa fa-circle-o-notch fa-lg fa-spin" />;
export const Error = ({ data: { error: { message } } }) => <div>{message}</div>;
Error.propTypes = {
  data: PropTypes.object.isRequired
};

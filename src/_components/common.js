import React from 'react';
import PropTypes from 'prop-types';
import { pathOr } from 'ramda';

export const Spinner = () => <i className="fa fa-circle-o-notch fa-lg fa-spin" />;
export const Error = ({ data }) => <div>{data.error.toString()}</div>;

Error.propTypes = {
  data: PropTypes.object.isRequired
};

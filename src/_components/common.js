import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { pathOr } from 'ramda';
import { connect } from 'react-redux';
import { setLoginState } from '../action/credential';

export const Spinner = () => <i className="fa fa-circle-o-notch fa-lg fa-spin" />;
export const Error = ({ error }) => <div>{error.toString()}</div>;
export const NotFoundError = () => <div>Not Found</div>;

export const WithTokenExpireError = connect(null, { setLoginState })(props => {
  const networkError = pathOr(
    undefined,
    ['error', 'networkError', 'result', 'message'],
    props.data
  );
  if (networkError === 'jwt expired') {
    // eslint-disable-next-line
    localStorage.removeItem('token');
    props.setLoginState(false);
    return <Redirect from="*" to="/login" />;
  }
  return <Error error={props.data.error} />;
});

Error.propTypes = {
  error: PropTypes.object.isRequired
};

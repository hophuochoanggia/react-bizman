import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Login from './containers/Login';
import Main from './containers/Full';
import Toast from './element/Toast';

const App = ({ isLoggedIn }) => (
  <div>
    <Switch>
      <Route path="/login" name="Login" component={Login} />
      {isLoggedIn ? (
        <Route path="/" name="Main" component={Main} />
      ) : (
        <Redirect from="*" to="login" />
      )}
    </Switch>
    <Toast />
  </div>
);

App.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};
export default connect(state => ({ isLoggedIn: state.credential.isLoggedIn }))(App);

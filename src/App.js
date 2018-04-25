import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Login from './views/Login';
import Main from './views/Full';
import Toast from './_components/Toast';

const App = ({ isLoggedIn }) => (
  <div>
    <Switch>
      <Route path="/login" name="Login" component={Login} />
      {isLoggedIn ? (
        <Route path="/" name="Main" component={Main} />
      ) : (
        <Redirect from="*" to="/login" />
      )}
    </Switch>
    <Toast />
  </div>
);

App.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};
export default connect(state => ({ isLoggedIn: state.credential.isLoggedIn }))(App);

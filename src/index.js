import React from 'react';
import ReactDOM from 'react-dom';
import { createLogger } from 'redux-logger';

import { ApolloProvider } from 'react-apollo';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';
import 'react-datepicker/dist/react-datepicker.min.css';

import 'flag-icon-css/css/flag-icon.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'simple-line-icons/css/simple-line-icons.css';

import client from './graphql';
import rootReducer from './rootReducer';
import { decodeJwt } from './utils/jwt';

import '../scss/style.scss';
import '../scss/core/_dropdown-menu-right.scss';

import App from './App';

const initialState = {
  credential: {
    isLoggedIn: false
  },
  spinner: false
};
// eslint-disable-next-line
if (localStorage.hasOwnProperty('token')) {
  initialState.credential = decodeJwt(localStorage.token);
  initialState.credential.isLoggedIn = true;
}
const logger = createLogger();
const store = createStore(rootReducer, initialState, applyMiddleware(logger, thunk));

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/" name="App" component={App} />
        </Switch>
      </Router>
    </Provider>
  </ApolloProvider>,
  // eslint-disable-next-line
  document.getElementById('root')
);

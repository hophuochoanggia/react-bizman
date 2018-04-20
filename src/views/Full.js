import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Container } from 'reactstrap';
import Header from '../components/Header/';
import Sidebar from '../components/Sidebar/';
import Aside from '../components/Aside/';
import Footer from '../components/Footer/';
import Breadcrumb from '../components/Breadcrumb/';

import Dashboard from '../containers/Dashboard';
import User from '../containers/User';
import NewUser from '../containers/NewUser';
import EditUser from '../containers/EditUser';

class Full extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <div className="app-body">
          <Sidebar {...this.props} />
          <main className="main">
            <Breadcrumb />
            <Container fluid>
              <Switch>
                <Route exact path="/dashboard" name="Dashboard" component={Dashboard} />

                <Route exact path="/user/new" name="NewUser" component={NewUser} />
                <Route exact path="/user" name="User" component={User} />
                <Route path="/user/:id" name="UserDetail" component={EditUser} />

                <Redirect from="/" to="/dashboard" />
              </Switch>
            </Container>
          </main>
          <Aside />
        </div>
        <Footer />
      </div>
    );
  }
}

export default Full;

import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Container } from 'reactstrap';
import Header from '../components/Header/';
import Sidebar from '../components/Sidebar/';
import Aside from '../components/Aside/';
import Footer from '../components/Footer/';
import Breadcrumb from '../components/Breadcrumb/';

import Dashboard from '../containers/Dashboard';

import Users from '../containers/User/Users';
import NewUser from '../containers/User/NewUser';
import EditUser from '../containers/User/EditUser';
import Profile from '../containers/User/Profile';

import Patients from '../containers/Patient/Patients';
import NewPatient from '../containers/Patient/NewPatient';
import EditPatient from '../containers/Patient/EditPatient';

import EventTypes from '../containers/EventType/EventTypes';
import NewEventType from '../containers/EventType/NewEventType';
import EditEventType from '../containers/EventType/EditEventType';

import NewEvent from '../containers/Event/NewEvent';
import EditEvent from '../containers/Event/EditEvent';

import ReferralSetting from '../containers/Setting/Referral';

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
                <Route path="/user/:id" name="UserDetail" component={EditUser} />
                <Route exact path="/user" name="Users" component={Users} />
                <Route exact path="/profile" name="Profile" component={Profile} />

                <Route exact path="/patient/new" name="NewPatient" component={NewPatient} />
                <Route path="/patient/:id" name="PatientDetail" component={EditPatient} />
                <Route exact path="/patient" name="Patients" component={Patients} />

                <Route exact path="/eventType/new" name="EventTypes" component={NewEventType} />
                <Route path="/eventType/:id" name="EventTypeDetail" component={EditEventType} />
                <Route exact path="/eventType" name="EventTypes" component={EventTypes} />

                <Route
                  path="/event/:patientId/new/:eventTypeId"
                  name="Event"
                  component={NewEvent}
                />
                <Route path="/event/:id" name="Event" component={EditEvent} />

                <Route path="/setting/referral" name="Event" component={ReferralSetting} />

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

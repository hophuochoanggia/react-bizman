import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';

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

import Referrals from '../containers/Referral/Referrals';
import NewReferral from '../containers/Referral/NewReferral';
import EditReferral from '../containers/Referral/EditReferral';

import ReferralSetting from '../containers/Setting/Referral';

const Full = props => (
  <div className="app">
    <Header />
    <div className="app-body">
      <Sidebar {...props} />
      <main className="main">
        <Breadcrumb />
        <Container fluid>
          <Switch>
            <Route exact path="/dashboard" name="Dashboard" component={Dashboard} />

            <Route exact path="/user/new" name="NewUser" component={NewUser} />
            <Route path="/user/:id" name="UserDetail" component={EditUser} />
            <Route exact path="/user" name="User" component={Users} />
            <Route exact path="/profile" name="Profile" component={Profile} />

            <Route exact path="/patient/new" name="NewPatient" component={NewPatient} />
            <Route path="/patient/:id" name="PatientDetail" component={EditPatient} />
            <Route exact path="/patient" name="Patient" component={Patients} />

            <Route exact path="/eventType/new" name="NewEventType" component={NewEventType} />
            <Route path="/eventType/:id" name="EventTypeDetail" component={EditEventType} />
            <Route exact path="/eventType" name="EventType" component={EventTypes} />

            <Route path="/event/:patientId/new/:type" name="NewEvent" component={NewEvent} />
            <Route path="/event/:id" name="EventDetail" component={EditEvent} />

            <Route path="/referral/new" name="NewReferral" component={NewReferral} />
            <Route exact path="/referral" name="Referral" component={Referrals} />
            <Route path="/referral/:id" name="ReferralDetail" component={EditReferral} />

            <Route path="/setting/referral" name="ReferralSetting" component={ReferralSetting} />

            <Redirect from="/" to="/dashboard" />
          </Switch>
        </Container>
      </main>
      <Aside />
    </div>
    <Footer />
  </div>
);

export default Full;

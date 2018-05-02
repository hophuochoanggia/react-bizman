import React from 'react';
import { compose, withState, withHandlers, mapProps } from 'recompose';
import moment from 'moment';
import { Card, CardHeader, CardBody } from 'reactstrap';
import { graphql } from 'react-apollo';
import toast from '../../utils/toast';

const mockEvent = {
  type: 'STUDY',
  status: 'active',
  date: '30/04/2018'
};

const EventByPatient = p => {
  const { patient } = p;
  const event = mockEvent;
  return (
    <div>
      {console.log(p)}
      <h2>
        {patient.fullName} DOB {moment(patient.birthday).format('DD/MM/YYYY')}
      </h2>
      <br />
      Event
      <Card>
        <CardHeader>{event.type}</CardHeader>
        <CardBody>HEHE</CardBody>
      </Card>
    </div>
  );
};

const tranformProps = mapProps(({ data }) => ({
  patient: data.patient.edges[0].node,
  events: data.patient.edges[0].node.events.edges
}));

export default tranformProps(EventByPatient);

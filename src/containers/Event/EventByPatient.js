import React from 'react';
import { compose, mapProps } from 'recompose';
import { graphql } from 'react-apollo';
import moment from 'moment';
import { Row, Col, Card, CardHeader, CardBody } from 'reactstrap';

import WithSpinnerError from '../../_components/HOC/SpinnerError';
import AsyncDropdownButton from '../../_components/AsyncForm/DropdownButton';
import { EVENTTYPES_QUERY } from '../../graphql/eventType';

const AddEventButton = compose(
  graphql(EVENTTYPES_QUERY),
  WithSpinnerError,
  mapProps(({ data, history, title }) => ({
    items: data.eventTypes.edges,
    history,
    title
  }))
)(AsyncDropdownButton);

const EventByPatient = p => {
  const { patient, events, history } = p;
  return (
    <div>
      <Row>
        <Col>
          <h1 className="float-left">
            {patient.fullName} DOB {moment(patient.birthday).format('DD/MM/YYYY')}&nbsp;
          </h1>
          <span className="float-right">
            <AddEventButton history={history} title="Add Event" />
          </span>
        </Col>
      </Row>
      <hr />
      <h3>Active</h3>
      {events.map(({ node }) => (
        <Card key={node._id}>
          <CardHeader>Type: {node.type.name}</CardHeader>
          <CardBody>
            <p>Created at: {moment.utc(node.createdAt).format('DD/MM/YYYY')}</p>
            <p>Status: {node.status}</p>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

const tranformProps = mapProps(({ data, history }) => ({
  patient: data.patient.edges[0].node,
  events: data.patient.edges[0].node.events.edges,
  history
}));

export default tranformProps(EventByPatient);

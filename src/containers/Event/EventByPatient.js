import React from 'react';
import { compose, mapProps } from 'recompose';
import { graphql } from 'react-apollo';
import moment from 'moment';
import { Row, Col, Card, CardHeader, CardBody } from 'reactstrap';

import AsyncDropdownButton from '../../_components/AsyncForm/DropdownButton';
import WithSpinnerError from '../../_components/HOC/SpinnerError';
import { EVENTTYPES_QUERY } from '../../graphql/eventType';

const AddEventButton = compose(
  graphql(EVENTTYPES_QUERY),
  WithSpinnerError,
  mapProps(({
    data, patientId, history, title
  }) => ({
    items: data.eventTypes.edges,
    history,
    title,
    patientId
  }))
)(AsyncDropdownButton);

const EventByPatient = p => {
  const {
    patient, events, history, patientId
  } = p;
  return (
    <div>
      <Row>
        <Col>
          <h1 className="float-left">
            {patient.fullName} DOB {moment(patient.birthday).format('DD/MM/YYYY')}&nbsp;
          </h1>
          <span className="float-right">
            <AddEventButton history={history} title="Add Event" patientId={patientId} />
          </span>
        </Col>
      </Row>
      <hr />
      <h3>Active</h3>
      {events.map(({ node }) => (
        <Card key={node._id} onClick={() => history.push(`/event/${node._id}`)}>
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

const tranformProps = mapProps(({ data, history, match }) => ({
  patient: data.patient.edges[0].node,
  events: data.patient.edges[0].node.events.edges,
  patientId: match.params.id,
  history
}));

export default tranformProps(EventByPatient);

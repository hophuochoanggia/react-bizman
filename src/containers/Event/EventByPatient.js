import React from 'react';
import { mapProps } from 'recompose';
import moment from 'moment';
import { Row, Col, Card, CardHeader, CardBody } from 'reactstrap';

import DropdownButton from '../../_components/AsyncForm/DropdownButton';

const AddEventButton = ({ patientId, ...props }) => {
  const items = [
    {
      type: 'STUDY',
      link: `/event/${patientId}/new/STUDY`
    },
    {
      type: 'CPAP',
      link: `/event/${patientId}/new/CPAP`
    }
  ];
  return <DropdownButton items={items} {...props} />;
};

const eventList = (events, history) =>
  events.map(({ node }) => (
    <Card key={node._id} onClick={() => history.push(`/event/${node._id}`)}>
      <CardHeader>Type: {node.type}</CardHeader>
      <CardBody>
        <p>Created at: {moment.utc(node.createdAt).format('DD/MM/YYYY')}</p>
        <p>Status: {node.status}</p>
      </CardBody>
    </Card>
  ));

const EventByPatient = p => {
  const {
    patient, activeEvents, inactiveEvents, history, patientId
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
      {eventList(activeEvents, history)}
      <h3>Inactive</h3>
      {eventList(inactiveEvents, history)}
    </div>
  );
};

const tranformProps = mapProps(({ data, history, match }) => ({
  patient: data.patient.edges[0].node,
  activeEvents: data.patient.edges[0].node.activeEvents.edges,
  inactiveEvents: data.patient.edges[0].node.inactiveEvents.edges,
  patientId: match.params.id,
  history
}));

export default tranformProps(EventByPatient);

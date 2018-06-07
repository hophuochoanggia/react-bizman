import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input } from 'reactstrap';
import JSONSchemaEditor from '../../_components/CodeEditor/JSONSchemaEditor';

const EventTypeForm = ({
  input, JSONSchema, UISchema, handleInput, handleSubmit
}) => (
  <Row>
    <Col xs="12" sm="12" md="12" lg="12">
      <Card>
        <CardHeader>
          <h3>Event Type</h3>
        </CardHeader>
        <CardBody>
          <Row>
            <Col xs="12" sm="12" md="12" lg="12">
              <FormGroup>
                <Label>Type Name: *</Label>
                <Input
                  type="text"
                  name="name"
                  placeholder="Enter event type name"
                  value={input.name || ''}
                  onChange={e => handleInput('name')(e.target.value)}
                  required
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs="12" sm="12" md="12" lg="12">
              <FormGroup>
                <Label>Description: *</Label>
                <Input
                  type="textarea"
                  name="description"
                  rows="5"
                  placeholder="Enter type description"
                  value={input.description || ''}
                  onChange={e => handleInput('description')(e.target.value)}
                  required
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs="12" sm="12" md="12" lg="12">
              <JSONSchemaEditor
                JSONSchema={JSONSchema}
                UISchema={UISchema}
                handleSubmit={handleSubmit}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Col>
  </Row>
);

EventTypeForm.defaultProps = {
  input: {
    JSONSchema: {},
    UISchema: {}
  }
};
EventTypeForm.propTypes = {
  input: PropTypes.object,
  handleSubmit: PropTypes.func.isRequired,
  handleInput: PropTypes.func.isRequired,
  JSONSchema: PropTypes.object.isRequired,
  UISchema: PropTypes.object.isRequired
};

export default EventTypeForm;

import React from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Button,
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import FormBuilder from '../FormBuilder';
import { Spinner } from '../common';

const EventTypeForm = ({
  spinner, input, handleInput, handleSubmit
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
                  value={input.name}
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
                  value={input.description}
                  onChange={e => handleInput('description')(e.target.value)}
                  required
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs="12" sm="12" md="12" lg="12">
              <FormBuilder metadata={input.metadata} syncSchema={handleInput('metadata')} />
            </Col>
          </Row>
        </CardBody>
        <CardFooter>
          {spinner ? (
            <Spinner />
          ) : (
            <React.Fragment>
              <Button type="submit" size="md" color="primary" onClick={handleSubmit}>
                <i className="fa fa-dot-circle-o" /> Submit
              </Button>
              <Button type="reset" size="md" color="danger">
                <i className="fa fa-ban" /> Reset
              </Button>
            </React.Fragment>
          )}
        </CardFooter>
      </Card>
    </Col>
  </Row>
);
EventTypeForm.propTypes = {
  input: PropTypes.object.isRequired,
  spinner: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleInput: PropTypes.func.isRequired
};

export default EventTypeForm;

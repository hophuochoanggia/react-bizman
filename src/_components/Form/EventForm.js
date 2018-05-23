import React from 'react';
import {
  Row,
  Col,
  Button,
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  FormGroup,
  Label
} from 'reactstrap';

import Dropdown from '../AsyncForm/DropdownList';
import FormViewer from '../FormBuilder/Viewer';
import { Spinner } from '../common';

export default ({
  spinner,
  input,
  schema,
  handleInput,
  handleSelect,
  handleSubmit,
  CONSULTANT,
  DOCTOR,
  SPECIALIST,
  DENTIST,
  SCIENTIST
}) => (
  <Row>
    <Col xs="12" sm="12">
      <Card>
        <CardHeader>
          <h3>Event Detail</h3>
        </CardHeader>
        <CardBody>
          <Row>
            <Col xs="12" sm="12" md="6" lg="6">
              <FormGroup>
                <Label>Consultant: *</Label>
                <Dropdown
                  defaultValue={input.consultant}
                  defaultOptions={CONSULTANT}
                  handleChange={handleSelect('consultant')}
                />
              </FormGroup>
            </Col>
            <Col xs="12" sm="12" md="6" lg="6">
              <FormGroup>
                <Label>Doctor: *</Label>
                <Dropdown
                  defaultValue={input.doctor}
                  defaultOptions={DOCTOR}
                  handleChange={handleSelect('doctor')}
                />
              </FormGroup>
            </Col>
            <Col xs="12" sm="12" md="6" lg="6">
              <FormGroup>
                <Label>Specialist: *</Label>
                <Dropdown
                  defaultValue={input.specialist}
                  defaultOptions={SPECIALIST}
                  handleChange={handleSelect('specialist')}
                />
              </FormGroup>
            </Col>
            <Col xs="12" sm="12" md="6" lg="6">
              <FormGroup>
                <Label>Dentist:</Label>
                <Dropdown
                  defaultValue={input.dentist}
                  defaultOptions={DENTIST}
                  handleChange={handleselect('dentist')}
                />
              </FormGroup>
            </Col>
            <Col xs="12" sm="12" md="6" lg="6">
              <FormGroup>
                <Label>Scientist:</Label>
                <Dropdown
                  defaultValue={input.scientist}
                  defaultOptions={SCIENTIST}
                  handleChange={handleSelect('scientist')}
                />
              </FormGroup>
            </Col>
          </Row>
          <hr />
          <FormViewer schema={schema} data={input.data} handleData={handleInput('data')} />
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

import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  Row,
  Col,
  Button,
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import DatePicker from 'react-datepicker';

import { Spinner } from './common';
import { ConsultantDropdown } from './Dropdown';

const PatientForm = ({
  spinner,
  input,
  handleInput,
  handleSubmit,
}) => (
  <Row>
    <Col xs="12" sm="12">
      <Card>
        <CardHeader>
          <h3>Patient Detail</h3>
        </CardHeader>
        <CardBody>
          <Row>
            <Col xs="12" sm="12" md="6" lg="6">
              <FormGroup>
                <Label>First Name: *</Label>
                <Input
                  type="text"
                  name="firstName"
                  placeholder="Enter first name"
                  defaultValue={input.firstName}
                  onChange={e => handleInput('firstName')(e.target.value)}
                  required
                />
              </FormGroup>
            </Col>
            <Col xs="12" sm="12" md="6" lg="6">
              <FormGroup>
                <Label>Last Name: *</Label>
                <Input
                  type="text"
                  name="lastName"
                  placeholder="Enter last name"
                  defaultValue={input.lastName}
                  onChange={e => handleInput('lastName')(e.target.value)}
                  required
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs="12" sm="12" md="6" lg="6">
              <FormGroup>
                <Label>Address: *</Label>
                <Input
                  type="text"
                  name="address"
                  placeholder="Enter address"
                  defaultValue={input.address}
                  onChange={e => handleInput('address')(e.target.value)}
                  required
                />
              </FormGroup>
            </Col>
            <Col xs="12" sm="12" md="6" lg="6">
              <FormGroup>
                <Label>Address 2:</Label>
                <Input
                  type="text"
                  name="address2"
                  placeholder="Enter address 2"
                  defaultValue={input.address2}
                  onChange={e => handleInput('address2')(e.target.value)}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs="12" sm="12" md="6" lg="6">
              <FormGroup>
                <Label>Email: *</Label>
                <Input
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  defaultValue={input.email}
                  onChange={e => handleInput('email')(e.target.value)}
                  required
                />
              </FormGroup>
            </Col>
            <Col xs="12" sm="12" md="6" lg="6">
              <FormGroup>
                <Label>Consultant: *</Label>
                <ConsultantDropdown
                  current={input.consultant}
                  name="users"
                  handleChange={handleInput('consultantId')}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs="12" sm="6" md="2" lg="2">
              <FormGroup>
                <Label>Gender</Label>
                <Input
                  type="select"
                  name="isMale"
                  defaultValue={input.isMale}
                  onChange={handleInput('isMale')}
                >
                  <option value>Male</option>
                  <option defaultValue={false}>Female</option>
                </Input>
              </FormGroup>
            </Col>
            <Col xs="12" sm="6" md="2" lg="2">
              <FormGroup>
                <Label>Birthday</Label>
                <DatePicker
                  dateFormat="DD/MM/YYYY"
                  selected={moment(input.birthday)}
                  onChange={e => handleInput('birthday')(e.format('YYYY-MM-DD'))}
                  customInput={<Input name="birthday" />}
                />
              </FormGroup>
            </Col>
            <Col xs="12" sm="6" md="4" lg="4">
              <FormGroup>
                <Label>Suburb</Label>
                <Input
                  type="text"
                  name="suburb"
                  placeholder="Enter suburb"
                  defaultValue={input.suburb}
                  onChange={e => handleInput('suburn')(e.target.value)}
                />
              </FormGroup>
            </Col>
            <Col xs="12" sm="6" md="4" lg="4">
              <FormGroup>
                <Label>State</Label>
                <Input
                  type="text"
                  name="state"
                  placeholder="Enter state"
                  defaultValue={input.state}
                  onChange={e => handleInput('state')(e.target.value)}
                />
              </FormGroup>
            </Col>
            <Col xs="12" sm="6" md="4" lg="4">
              <FormGroup>
                <Label>Work phone: *</Label>
                <Input
                  type="text"
                  name="workPhone"
                  placeholder="Enter work phone"
                  defaultValue={input.workPhone}
                  onChange={e => handleInput('workPhone')(e.target.value)}
                  required
                />
              </FormGroup>
            </Col>
            <Col xs="12" sm="6" md="4" lg="4">
              <FormGroup>
                <Label>Home phone:</Label>
                <Input
                  type="text"
                  name="homePhone"
                  placeholder="Enter home phone"
                  onChange={e => handleInput('homePhone')(e.target.value)}
                  defaultValue={input.homePhone}
                />
              </FormGroup>
            </Col>
            <Col xs="12" sm="6" md="4" lg="4">
              <FormGroup>
                <Label>Mobile phone:</Label>
                <Input
                  type="text"
                  name="mobile"
                  placeholder="Enter mobile phone"
                  defaultValue={input.mobile}
                  onChange={e => handleInput('homePhone')(e.target.value)}
                />
              </FormGroup>
            </Col>
            <Col xs="12" sm="6" md="4" lg="4">
              <FormGroup>
                <Label>Fax:</Label>
                <Input
                  type="text"
                  name="fax"
                  placeholder="Enter fax"
                  defaultValue={input.fax}
                  onChange={e => handleInput('fax')(e.target.value)}
                />
              </FormGroup>
            </Col>
            <Col xs="12" sm="6" md="4" lg="4">
              <FormGroup>
                <Label>Medicare: </Label>
                <Input
                  type="number"
                  name="medicare"
                  defaultValue={input.medicare}
                  onChange={e => handleInput('medicare')(e.target.value)}
                />
              </FormGroup>
            </Col>
            <Col xs="12" sm="6" md="4" lg="4">
              <FormGroup>
                <Label>Driving License: </Label>
                <Input
                  type="text"
                  name="dva"
                  defaultValue={input.drivingLicense}
                  onChange={e => handleInput('drivingLicense')(e.target.value)}
                />
              </FormGroup>
            </Col>
            <Col xs="12" sm="12" md="6" lg="6">
              <FormGroup>
                <Label>DVA No.:</Label>
                <Input
                  type="text"
                  name="providerNo"
                  placeholder="Enter provider number"
                  defaultValue={input.dva}
                  onChange={e => handleInput('dva')(e.target.value)}
                />
              </FormGroup>
            </Col>
            <Col xs="12" sm="12" md="6" lg="6">
              <FormGroup>
                <Label>DVA Type:</Label>
                <Input
                  type="select"
                  name="dvaType"
                  defaultValue={input.dvaType}
                  onChange={handleInput('dvaType')}
                >
                  <option defaultValue={null}>None</option>
                  <option defaultValue="GOLD">Gold</option>
                  <option defaultValue="SILVER">Silver</option>
                  <option defaultValue="ORANGE">Orange</option>
                </Input>
              </FormGroup>
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

PatientForm.propTypes = {
  input: PropTypes.object.isRequired,
  spinner: PropTypes.bool.isRequired,
  handleInput: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default PatientForm;

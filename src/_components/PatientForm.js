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
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import DatePicker from 'react-datepicker';

import { Spinner } from './common';
import Dropdown from './Dropdown';

const NewPatient = ({
  spinner,
  form,
  handleSubmit,
  handleSpinner,
  data,
  birthday,
  handleBirthday
}) => (
  <Form onSubmit={e => handleSubmit(e, handleSpinner)}>
    <Row>
      <Col xs="12" sm="12">
        <Card>
          <CardHeader>
            <h3>New Patient</h3>
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
                    defaultValue={form.firstName}
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
                    defaultValue={form.lastName}
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
                    defaultValue={form.address}
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
                    defaultValue={form.address2}
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
                    defaultValue={form.email}
                    required
                  />
                </FormGroup>
              </Col>
              <Col xs="12" sm="12" md="6" lg="6">
                <FormGroup>
                  <Label>Consultant: *</Label>
                  <Dropdown data={data.users.edges} name="consultantId" required />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs="12" sm="6" md="2" lg="2">
                <FormGroup>
                  <Label>Gender</Label>
                  <Input type="select" name="isMale" defaultValue={form.isMale}>
                    <option value>Male</option>
                    <option defaultValue={false}>Female</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col xs="12" sm="6" md="2" lg="2">
                <FormGroup>
                  <Label>Birthday</Label>
                  <DatePicker
                    selected={birthday}
                    onChange={handleBirthday}
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
                    defaultValue={form.suburb}
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
                    defaultValue={form.state}
                  />
                </FormGroup>
              </Col>
              <Col xs="12" sm="6" md="4" lg="4">
                <FormGroup>
                  <Label>Work phone: *</Label>
                  <Input
                    type="tex"
                    name="workPhone"
                    placeholder="Enter work phone"
                    defaultValue={form.workPhone}
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
                    defaultValue={form.homePhone}
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
                    defaultValue={form.mobile}
                  />
                </FormGroup>
              </Col>
              <Col xs="12" sm="6" md="4" lg="4">
                <FormGroup>
                  <Label>Fax:</Label>
                  <Input type="text" name="fax" placeholder="Enter fax" defaultValue={form.fax} />
                </FormGroup>
              </Col>
              <Col xs="12" sm="6" md="4" lg="4">
                <FormGroup>
                  <Label>Medicare: </Label>
                  <Input type="number" name="role" defaultValue={form.medicare} />
                </FormGroup>
              </Col>
              <Col xs="12" sm="6" md="4" lg="4">
                <FormGroup>
                  <Label>Driving License: </Label>
                  <Input type="text" name="role" defaultValue={form.drivingLicense} />
                </FormGroup>
              </Col>
              <Col xs="12" sm="12" md="6" lg="6">
                <FormGroup>
                  <Label>DVA No.:</Label>
                  <Input
                    type="text"
                    name="providerNo"
                    placeholder="Enter provider number"
                    defaultValue={form.dva}
                  />
                </FormGroup>
              </Col>
              <Col xs="12" sm="12" md="6" lg="6">
                <FormGroup>
                  <Label>DVA Type:</Label>
                  <Input type="select" name="role" defaultValue={form.dvaType}>
                    <option value={null}>None</option>
                    <option value="GOLD">Gold</option>
                    <option value="SILVER">Silver</option>
                    <option value="ORANGE">Orange</option>
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
                <Button type="submit" size="md" color="primary">
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
  </Form>
);

NewPatient.defaultProps = {
  form: {}
};

NewPatient.propTypes = {
  form: PropTypes.object,
  spinner: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleSpinner: PropTypes.func.isRequired
};

export default NewPatient;

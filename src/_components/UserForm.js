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
import { Spinner } from './common';

const UserForm = ({ spinner, input }) => (
  <Row>
    <Col xs="12" sm="12">
      <Card>
        <CardHeader>User Detail</CardHeader>
        <CardBody>
          <Row>
            <Col xs="12" sm="12" md="12" lg="12">
              <FormGroup>
                <Label>Username: *</Label>
                <Input
                  type="text"
                  name="username"
                  placeholder="Enter username"
                  defaultValue={input.username}
                  required
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs="12" sm="12" md="6" lg="6">
              <FormGroup>
                <Label>First Name: *</Label>
                <Input
                  type="text"
                  name="firstName"
                  placeholder="Enter first name"
                  defaultValue={input.firstName}
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
                  required
                />
              </FormGroup>
            </Col>
            <Col xs="12" sm="12" md="6" lg="6">
              <FormGroup>
                <Label>Email 2:</Label>
                <Input
                  type="email"
                  name="email2"
                  placeholder="Enter email 2"
                  defaultValue={input.email2}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs="12" sm="6" md="4" lg="4">
              <FormGroup>
                <Label>Gender</Label>
                <Input type="select" name="isMale" defaultValue={input.isMale}>
                  <option value>Male</option>
                  <option value={false}>Female</option>
                </Input>
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
                  defaultValue={input.workPhone}
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
                />
              </FormGroup>
            </Col>
            <Col xs="12" sm="6" md="4" lg="4">
              <FormGroup>
                <Label>Fax:</Label>
                <Input type="text" name="fax" placeholder="Enter fax" defaultValue={input.fax} />
              </FormGroup>
            </Col>

            <Col xs="12" sm="6" md="4" lg="4">
              <FormGroup>
                <Label>Provider No.:</Label>
                <Input
                  type="text"
                  name="providerNo"
                  placeholder="Enter provider number"
                  defaultValue={input.providerNo}
                />
              </FormGroup>
            </Col>
            <Col xs="12" sm="6" md="4" lg="4">
              <FormGroup>
                <Label>Role: *</Label>
                <Input type="select" name="role" defaultValue={input.role}>
                  <option value="consultant">Consultant</option>
                  <option value="admin">Admin</option>
                  <option value="doctor">Doctor</option>
                  <option value="specialist">Specialist</option>
                  <option value="dentist">Dentist</option>
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
);

UserForm.defaultProps = {
  input: {}
};

UserForm.propTypes = {
  input: PropTypes.object,
  spinner: PropTypes.bool.isRequired
};
export default UserForm;

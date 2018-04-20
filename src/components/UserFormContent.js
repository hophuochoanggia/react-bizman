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
import { Spinner } from '../components/common';

const UserFormContent = ({ spinner, input }) => (
  <Row>
    <Col xs="12" sm="12">
      <Card>
        <CardHeader>New User</CardHeader>
        <CardBody>
          <Row>
            <Col xs="12" sm="12" md="6" lg="6">
              <FormGroup>
                <Label>Username: *</Label>
                <Input
                  type="text"
                  name="username"
                  placeholder="Enter username"
                  defaultValue={input ? input.username : ''}
                  required
                />
              </FormGroup>
            </Col>
            <Col xs="12" sm="12" md="6" lg="6">
              <FormGroup>
                <Label>Password: *</Label>
                <Input type="password" name="password" placeholder="Enter user password" required />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs="12" sm="12" md="6" lg="6">
              <FormGroup>
                <Label>First Name: *</Label>
                <Input type="text" name="firstName" placeholder="Enter first name" required />
              </FormGroup>
            </Col>
            <Col xs="12" sm="12" md="6" lg="6">
              <FormGroup>
                <Label>Last Name: *</Label>
                <Input type="text" name="lastName" placeholder="Enter last name" required />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs="12" sm="12" md="6" lg="6">
              <FormGroup>
                <Label>Address: *</Label>
                <Input type="text" name="address" placeholder="Enter address" required />
              </FormGroup>
            </Col>
            <Col xs="12" sm="12" md="6" lg="6">
              <FormGroup>
                <Label>Address 2:</Label>
                <Input type="text" name="address2" placeholder="Enter address 2" />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs="12" sm="6" md="4" lg="4">
              <FormGroup>
                <Label>Gender</Label>
                <Input type="select" name="isMale">
                  <option value>Male</option>
                  <option value={false}>Female</option>
                </Input>
              </FormGroup>
            </Col>
            <Col xs="12" sm="6" md="4" lg="4">
              <FormGroup>
                <Label>Suburb</Label>
                <Input type="text" name="suburb" placeholder="Enter suburb" />
              </FormGroup>
            </Col>
            <Col xs="12" sm="6" md="4" lg="4">
              <FormGroup>
                <Label>State</Label>
                <Input type="text" name="state" placeholder="Enter state" />
              </FormGroup>
            </Col>
            <Col xs="12" sm="6" md="4" lg="4">
              <FormGroup>
                <Label>Work phone: *</Label>
                <Input type="tex" name="workPhone" placeholder="Enter work phone" required />
              </FormGroup>
            </Col>
            <Col xs="12" sm="6" md="4" lg="4">
              <FormGroup>
                <Label>Home phone:</Label>
                <Input type="text" name="homePhone" placeholder="Enter home phone" />
              </FormGroup>
            </Col>
            <Col xs="12" sm="6" md="4" lg="4">
              <FormGroup>
                <Label>Mobile phone:</Label>
                <Input type="text" name="mobilePhone" placeholder="Enter mobile phone" />
              </FormGroup>
            </Col>
            <Col xs="12" sm="6" md="4" lg="4">
              <FormGroup>
                <Label>Fax:</Label>
                <Input type="text" name="fax" placeholder="Enter fax" />
              </FormGroup>
            </Col>
            <Col xs="12" sm="6" md="4" lg="4">
              <FormGroup>
                <Label>Email: *</Label>
                <Input type="email" name="email" placeholder="Enter email" required />
              </FormGroup>
            </Col>
            <Col xs="12" sm="6" md="4" lg="4">
              <FormGroup>
                <Label>Email 2:</Label>
                <Input type="email" name="email2" placeholder="Enter email 2" />
              </FormGroup>
            </Col>
            <Col xs="12" sm="6" md="4" lg="4">
              <FormGroup>
                <Label>Provider No.:</Label>
                <Input type="text" name="providerNo" placeholder="Enter provider number" />
              </FormGroup>
            </Col>
            <Col xs="12" sm="6" md="4" lg="4">
              <FormGroup>
                <Label>Role: *</Label>
                <Input type="select" name="role">
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

UserFormContent.propTypes = {
  input: PropTypes.object,
  spinner: PropTypes.bool.isRequired
};
export default UserFormContent;

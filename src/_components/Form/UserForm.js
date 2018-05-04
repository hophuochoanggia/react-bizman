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
import { Spinner } from '../common';

const UserForm = ({ spinner, input, handleInput, handleSubmit }) => (
  <Row>
    <Col xs="12" sm="12">
      <Card>
        <CardHeader>
          <h3>User Detail</h3>
        </CardHeader>
        <CardBody>
          <Row>
            <Col xs="12" sm="12" md="12" lg="12">
              <FormGroup>
                <Label>Username: *</Label>
                <Input
                  type="text"
                  name="username"
                  placeholder="Enter username"
                  value={input.username || ''}
                  onChange={handleInput('username')}
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
                  value={input.firstName || ''}
                  onChange={handleInput('firstName')}
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
                  value={input.lastName || ''}
                  onChange={handleInput('lastName')}
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
                  value={input.address || ''}
                  onChange={handleInput('address')}
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
                  value={input.address2 || ''}
                  onChange={handleInput('address2')}
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
                  value={input.email || ''}
                  onChange={handleInput('email')}
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
                  value={input.email2 || ''}
                  onChange={handleInput('email2')}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs="12" sm="6" md="4" lg="4">
              <FormGroup>
                <Label>Gender</Label>
                <Input
                  type="select"
                  name="isMale"
                  value={input.isMale}
                  onChange={handleInput('isMale')}
                >
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
                  value={input.suburb || ''}
                  onChange={handleInput('suburb')}
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
                  value={input.state || ''}
                  onChange={handleInput('state')}
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
                  value={input.workPhone || ''}
                  onChange={handleInput('workPhone')}
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
                  value={input.homePhone || ''}
                  onChange={handleInput('homePhone')}
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
                  value={input.mobile || ''}
                  onChange={handleInput('mobile')}
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
                  value={input.fax || ''}
                  onChange={ handleInput('fax')}
                />
              </FormGroup>
            </Col>

            <Col xs="12" sm="6" md="4" lg="4">
              <FormGroup>
                <Label>Provider No.:</Label>
                <Input
                  type="text"
                  name="providerNo"
                  placeholder="Enter provider number"
                  value={input.providerNo || ''}
                  onChange={handleInput('providerNo')}
                />
              </FormGroup>
            </Col>
            <Col xs="12" sm="6" md="4" lg="4">
              <FormGroup>
                <Label>Role: *</Label>
                <Input
                  type="select"
                  name="role"
                  value={input.role}
                  onChange={handleInput('role')}
                >
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

UserForm.propTypes = {
  input: PropTypes.object.isRequired,
  spinner: PropTypes.bool.isRequired,
  handleInput: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};
export default UserForm;

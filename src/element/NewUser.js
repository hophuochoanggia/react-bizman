import React from 'react';
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

const NewUser = () => (
  <Form className="animated fadeIn">
    <Row>
      <Col xs="12" sm="12">
        <Card>
          <CardHeader>New User</CardHeader>
          <CardBody>
            <Row>
              <Col xs="12" sm="12" md="6" lg="6">
                <FormGroup>
                  <Label>Username: *</Label>
                  <Input type="text" id="username" placeholder="Enter username" required />
                </FormGroup>
              </Col>
              <Col xs="12" sm="12" md="6" lg="6">
                <FormGroup>
                  <Label>Password: *</Label>
                  <Input type="password" id="password" placeholder="Enter user password" required />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs="12" sm="12" md="6" lg="6">
                <FormGroup>
                  <Label>First Name: *</Label>
                  <Input type="text" id="firstName" placeholder="Enter first name" required />
                </FormGroup>
              </Col>
              <Col xs="12" sm="12" md="6" lg="6">
                <FormGroup>
                  <Label>Last Name: *</Label>
                  <Input type="text" id="lastName" placeholder="Enter last name" required />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs="12" sm="12" md="6" lg="6">
                <FormGroup>
                  <Label>Address: *</Label>
                  <Input type="text" id="address" placeholder="Enter address" required />
                </FormGroup>
              </Col>
              <Col xs="12" sm="12" md="6" lg="6">
                <FormGroup>
                  <Label>Address 2:</Label>
                  <Input type="text" id="address2" placeholder="Enter address 2" />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs="12" sm="6" md="4" lg="4">
                <FormGroup>
                  <Label>Gender</Label>
                  <Input type="select" name="gender" id="gender">
                    <option value="1">Male</option>
                    <option value="0">Female</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col xs="12" sm="6" md="4" lg="4">
                <FormGroup>
                  <Label>Suburb</Label>
                  <Input type="text" id="suburb" placeholder="Enter suburb" />
                </FormGroup>
              </Col>
              <Col xs="12" sm="6" md="4" lg="4">
                <FormGroup>
                  <Label>State</Label>
                  <Input type="text" id="state" placeholder="Enter state" />
                </FormGroup>
              </Col>
              <Col xs="12" sm="6" md="4" lg="4">
                <FormGroup>
                  <Label>Work phone: *</Label>
                  <Input type="text" id="workPhone" placeholder="Enter work phone" required />
                </FormGroup>
              </Col>
              <Col xs="12" sm="6" md="4" lg="4">
                <FormGroup>
                  <Label>Home phone:</Label>
                  <Input type="text" id="homePhone" placeholder="Enter home phone" />
                </FormGroup>
              </Col>
              <Col xs="12" sm="6" md="4" lg="4">
                <FormGroup>
                  <Label>Mobile phone:</Label>
                  <Input type="text" id="mobilePhone" placeholder="Enter mobile phone" />
                </FormGroup>
              </Col>
              <Col xs="12" sm="6" md="4" lg="4">
                <FormGroup>
                  <Label>Fax:</Label>
                  <Input type="text" id="fax" placeholder="Enter fax" />
                </FormGroup>
              </Col>
              <Col xs="12" sm="6" md="4" lg="4">
                <FormGroup>
                  <Label>Email: *</Label>
                  <Input type="text" id="email" placeholder="Enter email" required />
                </FormGroup>
              </Col>
              <Col xs="12" sm="6" md="4" lg="4">
                <FormGroup>
                  <Label>Email 2:</Label>
                  <Input type="text" id="email2" placeholder="Enter email 2" />
                </FormGroup>
              </Col>
              <Col xs="12" sm="6" md="4" lg="4">
                <FormGroup>
                  <Label>Provider No.:</Label>
                  <Input type="text" id="providerNo" placeholder="Enter provider number" />
                </FormGroup>
              </Col>
              <Col xs="12" sm="6" md="4" lg="4">
                <FormGroup>
                  <Label>Role: *</Label>
                  <Input type="select" name="role" id="role">
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
            <Button className="float-right" type="reset" size="sm" color="danger">
              <i className="fa fa-ban" /> Reset
            </Button>
            <Button className="float-right" type="submit" size="sm" color="success">
              <i className="fa fa-dot-circle-o" /> Submit
            </Button>
          </CardFooter>
        </Card>
      </Col>
    </Row>
  </Form>
);

export default NewUser;

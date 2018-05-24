import React from 'react';
import moment from 'moment';
import { Row, Col, Button, Card, CardHeader, CardBody, FormGroup, Label, Input } from 'reactstrap';
import Form from 'react-jsonschema-form';
import { pathOr } from 'ramda';
import PropTypes from 'prop-types';

import DatePicker from 'react-datepicker';
import stringToJSX from '../../utils/stringToJSX';

const ReferralForm = ({
  JSONSchema,
  UISchema,
  input,
  handleInput,
  handleInputAsValue,
  handleInputNested,
  handleSchemaForm,
  handleSubmit
}) => {
  const { height, weight, neck } = pathOr({}, ['data', 'BMI'], input);
  return (
    <Card>
      <CardHeader>
        <h3>Referral Detail</h3>
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
          <Col xs="12" sm="6" md="3" lg="3">
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
          <Col xs="12" sm="12" md="3" lg="3">
            <FormGroup>
              <Label>Birthday</Label>
              <DatePicker
                dateFormat="DD/MM/YYYY"
                selected={moment(input.birthday)}
                onChange={e => handleInputAsValue('birthday')(e.format('YYYY-MM-DD'))}
                customInput={<Input name="birthday" />}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
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
              <Label>Driving License: </Label>
              <Input
                type="text"
                name="dva"
                value={input.drivingLicense || ''}
                onChange={handleInput('drivingLicense')}
              />
            </FormGroup>
          </Col>
          <Col xs="12" sm="6" md="4" lg="4">
            <FormGroup>
              <Label>Medical No.</Label>
              <Input
                type="text"
                name="medicalNo"
                placeholder="Enter medical number"
                value={input.medicalNo || ''}
                onChange={handleInput('medicalNo')}
              />
            </FormGroup>
          </Col>
          <Col xs="12" sm="6" md="6" lg="6">
            <FormGroup>
              <Label>DVA No.:</Label>
              <Input
                type="text"
                name="dvaNo"
                placeholder="Enter provider number"
                value={input.dva || ''}
                onChange={handleInput('dva')}
              />
            </FormGroup>
          </Col>
          <Col xs="12" sm="12" md="6" lg="6">
            <FormGroup>
              <Label>DVA Type:</Label>
              <Input
                type="select"
                name="dvaType"
                value={input.dvaType}
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
        <hr />
        <Row>
          <Col xs="12" sm="6" md="6" lg="6">
            <FormGroup>
              <Label>Height (cm):</Label>
              <Input
                type="number"
                name="height"
                placeholder="Enter Height"
                value={height || ''}
                onChange={handleInputNested('BMI')('height')}
              />
            </FormGroup>
          </Col>
          <Col xs="12" sm="12" md="6" lg="6">
            <FormGroup>
              <Label>Weight (kg):</Label>
              <Input
                type="number"
                name="weight"
                placeholder="Enter Weight"
                value={weight || ''}
                onChange={handleInputNested('BMI')('weight')}
              />
            </FormGroup>
          </Col>
          <Col xs="12" sm="6" md="6" lg="6">
            <FormGroup>
              <Label>BMI:</Label>
              <Input
                type="text"
                name="BMI"
                value={Math.round(weight / (height / 100) ** 2) || 'N/A'}
                disabled
              />
            </FormGroup>
          </Col>
          <Col xs="12" sm="12" md="6" lg="6">
            <FormGroup>
              <Label>Neck Circumference:</Label>
              <Input
                type="number"
                name="neck"
                placeholder="Enter Neck Circumference"
                value={neck || ''}
                onChange={handleInputNested('BMI')('neck')}
              />
            </FormGroup>
          </Col>
        </Row>
        <hr />
        <Form
          schema={JSONSchema}
          uiSchema={stringToJSX(UISchema)}
          formData={input.data}
          onChange={({ formData }) => {
            handleSchemaForm(formData);
          }}
        >
          <Button color="info" onClick={handleSubmit}>
            Submit
          </Button>
          {input.status === 'PENDING' && <Button color="danger">Delete</Button>}
        </Form>
      </CardBody>
    </Card>
  );
};

ReferralForm.defaultProps = {
  input: {
    data: {}
  }
};

ReferralForm.propTypes = {
  input: PropTypes.object
};

export default ReferralForm;

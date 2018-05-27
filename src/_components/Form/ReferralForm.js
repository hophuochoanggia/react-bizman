import React from 'react';
import moment from 'moment';
import { Row, Col, Button, Card, CardHeader, CardBody, FormGroup, Label, Input } from 'reactstrap';
import Form from 'react-jsonschema-form';
import { pathOr, set, lensPath, compose } from 'ramda';
import { mapProps } from 'recompose';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import SignaturePad from 'react-signature-pad';
import './signCanvas.css';

import { Spinner } from '../common';
import stringToJSX from '../../utils/stringToJSX';

const calculateBMI = (height, weight) => Math.round(weight / (height / 100) ** 2) || 'N/A';
const getAge = dateString => {
  let today = new Date();
  let birthDate = new Date(dateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  let m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age -= 1;
  }
  return age;
};
class ReferralForm extends React.Component {
  componentDidMount() {
    const { input: { data: { signature } } } = this.props;
    this.signature.fromDataURL(signature);
  }
  render() {
    const {
      spinner,
      JSONSchema,
      UISchema,
      input,
      handleInput,
      handleInputAsValue,
      handleInputNested,
      handleSchemaForm,
      handleSubmit,
      height,
      weight,
      neck,
      location: { pathname }
    } = this.props;
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
                <Input type="text" name="BMI" value={calculateBMI(height, weight)} disabled />
              </FormGroup>
            </Col>
            <Col xs="12" sm="12" md="6" lg="6">
              <FormGroup>
                <Label>Neck Circumference (cm):</Label>
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
            <hr />
            <Col xs="12" sm="12" md="12" lg="12">
              <Row>
                <Label>Signature</Label>
              </Row>
              <Row>
                <SignaturePad
                  clearButton={(pathname === '/referral/new')}
                  ref={i => (this.signature = i)}
                />
              </Row>
            </Col>
            <hr />
            {spinner ? (
              <Spinner />
            ) : (
              <React.Fragment>
                <Button color="info" onClick={() => handleSubmit(this.signature.toDataURL())}>
                  Submit
                </Button>
                {input.status === 'PENDING' && <Button color="danger">Delete</Button>}
              </React.Fragment>
            )}
          </Form>
        </CardBody>
      </Card>
    );
  }
}
ReferralForm.defaultProps = {
  input: {
    data: {}
  },
  height: '',
  weight: '',
  neck: ''
};

ReferralForm.propTypes = {
  input: PropTypes.object,
  height: PropTypes.string,
  weight: PropTypes.string,
  neck: PropTypes.string,
  spinner: PropTypes.bool.isRequired,
  JSONSchema: PropTypes.object.isRequired,
  UISchema: PropTypes.object.isRequired,
  handleInput: PropTypes.func.isRequired,
  handleInputAsValue: PropTypes.func.isRequired,
  handleInputNested: PropTypes.func.isRequired,
  handleSchemaForm: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

const transformInputToBANG = mapProps(({ input, ...props }) => {
  const BANGLens = lensPath(['data', 'BANG']);
  const { height, weight, neck } = pathOr({}, ['data', 'BMI'], input);
  const BANG = {
    1: calculateBMI(height, weight) > 35,
    2: getAge(input.birthday) > 50,
    3: neck > 14,
    4: input.isMale !== 'false'
  };
  let newInput = set(BANGLens, BANG, input);
  return {
    input: newInput,
    height,
    weight,
    neck,
    ...props
  };
});

const calculateESSTotal = mapProps(({ input, ...props }) => {
  const ESSLens = lensPath(['data', 'ESS', 'total']);
  const ESS = pathOr({ 1: 0 }, ['data', 'ESS'], input);
  delete ESS.total;
  const total = Object.values(ESS).reduce((acc = 0, cur = 0) => acc + parseInt(cur, 10));
  const newInput = set(ESSLens, total, input);
  return {
    input: newInput,
    ...props
  };
});

export default compose(calculateESSTotal, transformInputToBANG)(ReferralForm);

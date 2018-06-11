/* eslint no-return-assign: 0 */
import React from 'react';
import moment from 'moment';
import {
  Row,
  Col,
  Table,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Label,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';
import { pathOr, set, lensPath, compose } from 'ramda';
import { mapProps } from 'recompose';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import SignaturePad from 'react-signature-pad';
import '../../misc/signCanvas.css';

import { Spinner } from '../common';
import ScoreScale from '../ScoreScale';
import ServiceAndSTOPForm from '../ServiceAndSTOPForm';

import ReduxCredential from '../HOC/ReduxCredential';

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

const ESS = [
  'Sitting and reading',
  'Watching television',
  'Sitting inactive in a public place (e.g. a theatre or meetin)',
  'As a passenger in a car for an hour without a break',
  'Lying down to rest in the afternoon when circumstances permit',
  'Sitting and talking to someone',
  'Sitting quietly after a lunch without alcohol',
  'In a car, while stopped for a few minutes in the traffic'
];

class ReferralForm extends React.Component {
  componentDidMount() {
    const { input: { data: { signature } } } = this.props;
    this.signature.fromDataURL(signature);
  }
  render() {
    const {
      spinner,
      input,
      handleInput,
      handleInputAsValue,
      handleInputNested,
      handleInputNestedAsValue,
      handleInputNestedCheckbox,
      handleSubmit,
      handleDelete,
      handleFile,
      height,
      weight,
      neck,
      location: { pathname },
      credential: { role }
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
          <ServiceAndSTOPForm
            service={input.data.service}
            STOP={input.data.STOP}
            handleInputNestedCheckbox={handleInputNestedCheckbox}
          />
          <Col xs="12" sm="12" md="12" lg="12">
            <FormGroup style={{ marginLeft: '15px' }}>
              <Row>
                <Label>
                  <h2>BANG Questionaire</h2>
                </Label>
              </Row>
              <Col xs="12" sm="12" md="12" lg="12">
                <Row>
                  <Input type="checkbox" checked={input.data.BANG[0]} disabled /> BMI more than 35
                  kg/m2?
                </Row>
                <Row>
                  <Input type="checkbox" checked={input.data.BANG[1]} disabled /> Age over 50 years?
                </Row>
                <Row>
                  <Input type="checkbox" checked={input.data.BANG[2]} disabled /> Neck circumference
                  greater than 40 cm?
                </Row>
                <Row>
                  <Input type="checkbox" checked={input.data.BANG[3]} disabled /> Gender, male
                </Row>
              </Col>
            </FormGroup>
          </Col>
          <Col xs="12" sm="12" md="12" lg="12">
            <Row>
              <Label>
                <h2>The Epworth Sleepiness Scale (ESS)</h2>
              </Label>
            </Row>
            <p>
              How likely are you to doze off or fall asleep in the following situations, in contrast
              to feeling just tired? This refers to your usual way of life in recent times. Even if
              you have not done some of these things recently try to work out how they would have
              affected you. Use the following scale to choose the most appropriate number for each
              situation:
            </p>
            <p>0 = would never doze</p>
            <p>1 = slight chance of dozing</p>
            <p>2 = moderate chance of dozing</p>
            <p>3 = high chance of dozing</p>
            <Table responsive size="sm">
              <tbody>
                {ESS.map((title, index) => (
                  <tr key={title}>
                    <td>{title}</td>
                    <td>
                      <ScoreScale
                        index={index}
                        min={0}
                        max={3}
                        selected={input.data.ESS[index]}
                        updateForm={handleInputNestedAsValue('ESS')}
                      />
                    </td>
                  </tr>
                ))}
                <tr>
                  <td>Total:</td>
                  <td>{input.data.ESS.total}</td>
                </tr>
              </tbody>
            </Table>
          </Col>
          <hr />
          {/*
          <section>
            <aside>
              <h4>Uploaded files</h4>
              <ul>
                {input.data.files.map(f => (
                  <li key={f.key}>
                    <a href={f.location}>{f.originalname}</a>
                  </li>
                ))}
              </ul>
            </aside>
            <div className="dropzone">
              <Dropzone
                style={{ width: '40%', height: '20%', border: '1px dashed black' }}
                onDrop={file => handleFile()(file, 'referral')}
              >
                <p>Drop file or click to upload</p>
              </Dropzone>
            </div>
          </section>
          */}
          <Col xs="12" sm="12" md="12" lg="12">
            <Row>
              <Label />
            </Row>
            <Row>
              <SignaturePad
                clearButton={pathname === '/referral/new'}
                ref={i => (this.signature = i)}
              />
            </Row>
          </Col>
          <hr />
          {spinner ? (
            <Spinner />
          ) : (
            <Button color="info" onClick={handleSubmit}>
              Submit
            </Button>
          )}
        </CardBody>
      </Card>
    );
  }
}

ReferralForm.defaultProps = {
  height: '',
  weight: '',
  neck: '',
  handleDelete: null
};

ReferralForm.propTypes = {
  input: PropTypes.object.isRequired,
  height: PropTypes.string,
  weight: PropTypes.string,
  neck: PropTypes.string,
  handleDelete: PropTypes.func,
  spinner: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
  handleInput: PropTypes.func.isRequired,
  handleInputAsValue: PropTypes.func.isRequired,
  handleInputNested: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

const transformInputToBANG = mapProps(({ input, ...props }) => {
  const BANGLens = lensPath(['data', 'BANG']);
  const { height, weight, neck } = pathOr({}, ['data', 'BMI'], input);
  const BANG = [
    calculateBMI(height, weight) > 35,
    getAge(input.birthday) > 50,
    neck > 14,
    input.isMale !== 'false'
  ];
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
  const ESS = pathOr({}, ['data', 'ESS'], input);
  delete ESS.total;
  const values = Object.values(ESS);
  const total =
    values.length === 0 ? 0 : values.reduce((acc = 0, cur = 0) => acc + parseInt(cur, 10));
  const newInput = set(ESSLens, total, input);
  return {
    input: newInput,
    ...props
  };
});

export default compose(calculateESSTotal, transformInputToBANG, ReduxCredential)(ReferralForm);

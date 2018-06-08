import React from 'react';
import { Row, Col, FormGroup, Label, Input } from 'reactstrap';

const Form = ({ service, STOP, handleInputNestedCheckbox }) => (
  <React.Fragment>
    <Col xs="12" sm="12" md="12" lg="12">
      <FormGroup style={{ marginLeft: '15px' }}>
        <Row>
          <Label>
            <h2>Service(s) Required</h2>
          </Label>
        </Row>
        <Col xs="12" sm="12" md="12" lg="12">
          <Row>
            <Input
              type="checkbox"
              checked={service[0]}
              onChange={handleInputNestedCheckbox('service')(0)}
            />{' '}
            Home Based Sleep Study
          </Row>
          <Row>
            <Input
              type="checkbox"
              checked={service[1]}
              onChange={handleInputNestedCheckbox('service')(1)}
            />{' '}
            Hospital Based Sleep Study
          </Row>
          <Row>
            <Input
              type="checkbox"
              checked={service[2]}
              onChange={handleInputNestedCheckbox('service')(2)}
            />{' '}
            Consultation with Sleep Physician
          </Row>
        </Col>
      </FormGroup>
    </Col>
    <Col xs="12" sm="12" md="12" lg="12">
      <FormGroup style={{ marginLeft: '15px' }}>
        <Row>
          <Label>
            <h2>STOP Questionaire</h2>
          </Label>
        </Row>
        <Col xs="12" sm="12" md="12" lg="12">
          <Row>
            <Input
              type="checkbox"
              checked={STOP[0]}
              onChange={handleInputNestedCheckbox('STOP')(0)}
            />{' '}
            Do you snore loudly?
          </Row>
          <Row>
            <Input
              type="checkbox"
              checked={STOP[1]}
              onChange={handleInputNestedCheckbox('STOP')(1)}
            />{' '}
            Do you often feel tired, fatigued or sleepy during the daytime?
          </Row>
          <Row>
            <Input
              type="checkbox"
              checked={STOP[2]}
              onChange={handleInputNestedCheckbox('STOP')(2)}
            />{' '}
            Has anyone noticed you stop breathing during your sleep?
          </Row>
          <Row>
            <Input
              type="checkbox"
              checked={STOP[3]}
              onChange={handleInputNestedCheckbox('STOP')(3)}
            />{' '}
            Do you have or are you being treated for high blood pressure?
          </Row>
          <Row>
            <Input
              type="checkbox"
              checked={STOP[4]}
              onChange={handleInputNestedCheckbox('STOP')(4)}
            />{' '}
            N/A
          </Row>
        </Col>
        <br />
      </FormGroup>
      <p>
        <b>Reference</b>: STOP Questionnaire (Chung F et al. Anesthesiology 2008 May; 108(5):812-21)
      </p>
      <p>
        Patients answering <b>Yes to 2 or more</b> of the above questions are at{' '}
        <b>high risk of having OSA</b> and may be referred directly for a Home Based Sleep Study.
        The Epworth Sleepiness Scale (ESS) may also be used to further determine the necessity for
        the investigation.
      </p>
    </Col>
  </React.Fragment>
);

export const serviceSTOPdefault = {
  service: [false, false, false],
  STOP: [false, false, false, false, false]
};

Form.defaultProps = serviceSTOPdefault;

export default Form;
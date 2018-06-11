import React from 'react';
import { Row, Col, FormGroup, Label, Input } from 'reactstrap';

const Form = ({
  disabled, service, STOP, handleInputNestedCheckbox
}) => (
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
              checked={service[0] || false}
              onChange={handleInputNestedCheckbox('service')(0)}
              disabled={disabled}
            />{' '}
            Home Based Sleep Study
          </Row>
          <Row>
            <Input
              type="checkbox"
              checked={service[1] || false}
              onChange={handleInputNestedCheckbox('service')(1)}
              disabled={disabled}
            />{' '}
            Hospital Based Sleep Study
          </Row>
          <Row>
            <Input
              type="checkbox"
              checked={service[2] || false}
              onChange={handleInputNestedCheckbox('service')(2)}
              disabled={disabled}
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
              checked={STOP[0] || false}
              onChange={handleInputNestedCheckbox('STOP')(0)}
              disabled={disabled}
            />{' '}
            Do you snore loudly?
          </Row>
          <Row>
            <Input
              type="checkbox"
              checked={STOP[1] || false}
              onChange={handleInputNestedCheckbox('STOP')(1)}
              disabled={disabled}
            />{' '}
            Do you often feel tired, fatigued or sleepy during the daytime?
          </Row>
          <Row>
            <Input
              type="checkbox"
              checked={STOP[2] || false}
              onChange={handleInputNestedCheckbox('STOP')(2)}
              disabled={disabled}
            />{' '}
            Has anyone noticed you stop breathing during your sleep?
          </Row>
          <Row>
            <Input
              type="checkbox"
              checked={STOP[3] || false}
              onChange={handleInputNestedCheckbox('STOP')(3)}
              disabled={disabled}
            />{' '}
            Do you have or are you being treated for high blood pressure?
          </Row>
          <Row>
            <Input
              type="checkbox"
              checked={STOP[4] || false}
              onChange={handleInputNestedCheckbox('STOP')(4)}
              disabled={disabled}
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

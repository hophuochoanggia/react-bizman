import React from 'react';
import { Row, Col, FormGroup, Label } from 'reactstrap';
import PropTypes from 'prop-types';

import { mapProps } from 'recompose';
import { pathOr } from 'ramda';
import Dropdown from '../../AsyncForm/DropdownList';

const UserSelection = ({
  input,
  handleSelect,
  CONSULTANT,
  DOCTOR,
  SPECIALIST,
  DENTIST,
  SCIENTIST
}) => (
  <Row>
    <Col xs="12" sm="12" md="6" lg="6">
      <FormGroup>
        <Label>Consultant: *</Label>
        <Dropdown
          defaultValue={input.consultant}
          defaultOptions={CONSULTANT}
          handleChange={handleSelect('consultant')}
        />
      </FormGroup>
    </Col>
    <Col xs="12" sm="12" md="6" lg="6">
      <FormGroup>
        <Label>Doctor: *</Label>
        <Dropdown
          defaultValue={input.doctor}
          defaultOptions={DOCTOR}
          handleChange={handleSelect('doctor')}
        />
      </FormGroup>
    </Col>
    <Col xs="12" sm="12" md="6" lg="6">
      <FormGroup>
        <Label>Specialist: *</Label>
        <Dropdown
          defaultValue={input.specialist}
          defaultOptions={SPECIALIST}
          handleChange={handleSelect('specialist')}
        />
      </FormGroup>
    </Col>
    <Col xs="12" sm="12" md="6" lg="6">
      <FormGroup>
        <Label>Dentist:</Label>
        <Dropdown
          defaultValue={input.dentist}
          defaultOptions={DENTIST}
          handleChange={handleSelect('dentist')}
        />
      </FormGroup>
    </Col>
    <Col xs="12" sm="12" md="6" lg="6">
      <FormGroup>
        <Label>Scientist:</Label>
        <Dropdown
          defaultValue={input.scientist}
          defaultOptions={SCIENTIST}
          handleChange={handleSelect('scientist')}
        />
      </FormGroup>
    </Col>
  </Row>
);

UserSelection.propTypes = {
  input: PropTypes.object.isRequired,
  handleSelect: PropTypes.func.isRequired,
  CONSULTANT: PropTypes.array.isRequired,
  DOCTOR: PropTypes.array.isRequired,
  SPECIALIST: PropTypes.array.isRequired,
  DENTIST: PropTypes.array.isRequired,
  SCIENTIST: PropTypes.array.isRequired
};

export default UserSelection;

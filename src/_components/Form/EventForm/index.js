import React from 'react';
import {
  Row,
  Col,
  Button,
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  FormGroup,
  Label
} from 'reactstrap';
import { mapProps } from 'recompose';
import { pathOr } from 'ramda';
import Dropdown from '../../AsyncForm/DropdownList';
import { Spinner } from '../../common';
import TypeResolver from './TypeResolver';

const UserSelection = ({
  input,
  selectedUsers,
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
          defaultValue={selectedUsers.CONSULTANT}
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

const EnhanceUserSelection = mapProps(({ input, ...props }) => {
  let selectedUsers = {};
  const users = pathOr([], ['users', 'edges'], input);
  users.map(({ node }) => {
    selectedUsers[node.role] = node._id;
  });
  return {
    input,
    selectedUsers,
    ...props
  };
})(UserSelection);

export default ({
  spinner, input, schema, handleInput, handleSubmit, ...props
}) => (
  <Row>
    <Col xs="12" sm="12">
      <Card>
        <CardHeader>
          <h3>Event Detail</h3>
        </CardHeader>
        <CardBody>
          <EnhanceUserSelection input={input} {...props} />
          <hr />
          <TypeResolver />
        </CardBody>
        <CardFooter>
          {spinner ? (
            <Spinner />
          ) : (
            <React.Fragment>
              <Button
                type="submit"
                size="md"
                color="primary"
                onClick={handleSubmit}
                disabled={spinner}
              >
                <i className="fa fa-dot-circle-o" /> Submit
              </Button>
            </React.Fragment>
          )}
        </CardFooter>
      </Card>
    </Col>
  </Row>
);

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
  Label,
  Input
} from 'reactstrap';

import UserSelection from './UserSelection';
import { Spinner } from '../../common';
import ServiceAndSTOPForm from '../../ServiceAndSTOPForm';

export default ({
  spinner,
  input,
  handleInput,
  handleInputNestedCheckbox,
  handleSubmit,
  handleSelect,
  ...props
}) => (
  <Row>
    <Col xs="12" sm="12">
      <Card>{console.log(input)}
        <CardHeader>
          <h3>Event Detail</h3>
        </CardHeader>
        <CardBody>
          <UserSelection input={input} handleSelect={handleSelect} {...props} />
          <br />
          <ServiceAndSTOPForm
            service={input.data.service}
            STOP={input.data.STOP}
            handleInputNestedCheckbox={handleInputNestedCheckbox}
          />
          <Col xs="12" sm="12" md="12" lg="12">
            <FormGroup>
              <Label>Additional clinical information:</Label>
              <Input type="text" name="add" />
            </FormGroup>
          </Col>
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

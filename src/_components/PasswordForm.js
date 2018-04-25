/* eslint-disable no-return-assign */
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
import { Spinner } from './common';

const PasswordForm = ({ spinner }) => (
  <Row>
    <Col xs="12" sm="12">
      <Card>
        <CardHeader>Change Password</CardHeader>
        <CardBody>
          <Row>
            <Col xs="12" sm="12" md="12" lg="12">
              <FormGroup>
                <Label>Old Password: *</Label>
                <Input type="password" name="old" placeholder="Enter old password" required />
              </FormGroup>
            </Col>
            <Col xs="12" sm="12" md="12" lg="12">
              <FormGroup>
                <Label>New Password: *</Label>
                <Input
                  type="password"
                  name="password"
                  placeholder="Enter new password"
                  required
                />
              </FormGroup>
            </Col>
            <Col xs="12" sm="12" md="12" lg="12">
              <FormGroup>
                <Label>Confirm Password: *</Label>
                <Input type="password" name="confirm" placeholder="Confirm password" required />
              </FormGroup>
            </Col>
          </Row>
        </CardBody>
        <CardFooter>
          {spinner ? (
            <Spinner />
            ) : (
              <React.Fragment>
                <Button type="submit" size="md" color="warning">
                  <i className="fa fa-dot-circle-o" /> Change Password
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

PasswordForm.propTypes = {
  spinner: PropTypes.bool.isRequired
};
export default PasswordForm;

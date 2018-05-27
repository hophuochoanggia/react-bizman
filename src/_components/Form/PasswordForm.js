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
import { Spinner } from '../common';

const PasswordForm = ({
  spinner, passwordInput, handlePassword, handlePasswordForm
}) => (
  <Row>
    <Col xs="12" sm="12">
      <Card>
        <CardHeader>
          <h3>Change Password</h3>
        </CardHeader>
        <CardBody>
          <Row>
            <Col xs="12" sm="12" md="12" lg="12">
              <FormGroup>
                <Label>Old Password: *</Label>
                <Input
                  type="password"
                  name="old"
                  placeholder="Enter old password"
                  value={passwordInput.old}
                  onChange={handlePasswordForm('old')}
                  required
                />
              </FormGroup>
            </Col>
            <Col xs="12" sm="12" md="12" lg="12">
              <FormGroup>
                <Label>New Password: *</Label>
                <Input
                  type="password"
                  name="password"
                  placeholder="Enter new password"
                  value={passwordInput.password}
                  onChange={handlePasswordForm('password')}
                  required
                />
              </FormGroup>
            </Col>
            <Col xs="12" sm="12" md="12" lg="12">
              <FormGroup>
                <Label>Confirm Password: *</Label>
                <Input
                  type="password"
                  name="confirm"
                  placeholder="Confirm password"
                  value={passwordInput.confirm}
                  onChange={handlePasswordForm('confirm')}
                  required
                />
              </FormGroup>
            </Col>
          </Row>
        </CardBody>
        <CardFooter>
          {spinner ? (
            <Spinner />
          ) : (
            <React.Fragment>
              <Button type="submit" size="md" color="warning" onClick={handlePassword}>
                <i className="fa fa-dot-circle-o" /> Change Password
              </Button>
            </React.Fragment>
          )}
        </CardFooter>
      </Card>
    </Col>
  </Row>
);

PasswordForm.propTypes = {
  spinner: PropTypes.bool.isRequired,
  passwordInput: PropTypes.object.isRequired,
  handlePassword: PropTypes.func.isRequired,
  handlePasswordForm: PropTypes.func.isRequired
};
export default PasswordForm;

import React from 'react';
import { compose, withHandlers } from 'recompose';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { graphql } from 'react-apollo';
import {
  Container,
  Row,
  Col,
  CardGroup,
  Card,
  CardBody,
  Button,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from 'reactstrap';

import { decodeJwt } from '../utils/jwt';
import toast from '../utils/toast';
import ControlForm from '../_components/HOC/ControlForm';
import ControlSpinner from '../_components/HOC/ControlSpinner';
import { LOGIN_MUTATION } from '../graphql/user';
import { setLoginState } from '../action/credential';
import { Spinner } from '../_components/common';

const Login = ({
  input, handleInput, handleLogin, spinner, isLoggedIn
}) => {
  if (isLoggedIn) return <Redirect to="/dashboard" />;
  return (
    <div className="app flex-row align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md="8">
            <CardGroup>
              <Card className="p-4">
                <CardBody>
                  <h1>Login</h1>
                  <p className="text-muted">Sign In to your account</p>
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="icon-user" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="text"
                      placeholder="Username"
                      value={input.username || ''}
                      onChange={handleInput('username')}
                    />
                  </InputGroup>
                  <InputGroup className="mb-4">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="icon-lock" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="password"
                      placeholder="Password"
                      value={input.password || ''}
                      onChange={handleInput('password')}
                    />
                  </InputGroup>
                  <Row>
                    <Col xs="6">
                      {spinner ? (
                        <Spinner />
                      ) : (
                        <Button color="primary" className="px-4" onClick={handleLogin}>
                          Login
                        </Button>
                      )}
                    </Col>
                    <Col xs="6" className="text-right">
                      <Button color="link" className="px-0">
                        Forgot password?
                      </Button>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
Login.defaultProps = {
  input: {
    username: '',
    password: ''
  }
};
Login.propTypes = {
  input: PropTypes.object,
  isLoggedIn: PropTypes.bool.isRequired,
  handleInput: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
  spinner: PropTypes.bool.isRequired
};

const WithRedux = connect(state => ({ isLoggedIn: state.credential.isLoggedIn }), {
  setLoginState
});

const WithLogin = withHandlers({
  handleLogin: ({
    login, input, handleSpinner, setLoginState
  }) => () => {
    handleSpinner();
    login({ variables: input })
      .then(({ data: { login: { token } } }) => {
        const credential = decodeJwt(token);
        credential.isLoggedIn = true;
        // eslint-disable-next-line
        localStorage.setItem('token', token);
        toast.success('Login success');
        setLoginState(credential);
      })
      .catch(error => {
        const { message } = error;
        toast.error(message);
        handleSpinner();
      });
  }
});

export default compose(
  graphql(LOGIN_MUTATION, { name: 'login' }),
  ControlForm,
  ControlSpinner,
  WithRedux,
  WithLogin
)(Login);

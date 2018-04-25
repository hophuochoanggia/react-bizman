import React from 'react';
import { withStateHandlers } from 'recompose';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Mutation } from 'react-apollo';
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
import { LOGIN_MUTATION } from '../graphql/user';
import { setCredential } from '../action/credential';
import { startSpinner, stopSpinner } from '../action/spinner';
import { Spinner } from '../_components/common';

const Login = ({
  form,
  handleForm,
  handleLogin,
  spinner,
  setCredential,
  handleSpinner,
  isLoggedIn
}) => {
  if (isLoggedIn) return <Redirect to="/dashboard" />;
  return (
    <Mutation mutation={LOGIN_MUTATION}>
      {login => (
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
                          value={form.username}
                          onChange={event => handleForm('username', event.target.value)}
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
                          value={form.password}
                          onChange={event => handleForm('password', event.target.value)}
                        />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          {spinner ? (
                            <Spinner />
                          ) : (
                            <Button
                              color="primary"
                              className="px-4"
                              onClick={() => handleLogin(login, setCredential, handleSpinner)}
                            >
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
      )}
    </Mutation>
  );
};

Login.propTypes = {
  form: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  handleForm: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
  spinner: PropTypes.bool.isRequired,
  setCredential: PropTypes.func.isRequired,
  handleSpinner: PropTypes.func.isRequired
};

const withRedux = connect(state => ({ isLoggedIn: state.credential.isLoggedIn }), {
  setCredential,
  startSpinner,
  stopSpinner
})(Login);

export default withStateHandlers(
  () => ({
    form: { username: 'superadmin', password: '12345' },
    spinner: false
  }),
  {
    handleSpinner: ({ spinner }) => () => ({ spinner: !spinner }),
    handleForm: ({ form }) => (key, value) => ({
      form: { ...form, [key]: value }
    }),
    handleLogin: ({ form }) => (login, setCredential, handleSpinner) => {
      handleSpinner();
      login({ variables: form })
        .then(({ data: { login: { token } } }) => {
          // eslint-disable-next-line
          localStorage.setItem('token', token);
          toast.success('Login success', {
            position: toast.POSITION.BOTTOM_RIGHT
          });
          setCredential(token);
        })
        .catch(error => {
          const { message } = error;
          toast.error(message.split(':')[1], {
            position: toast.POSITION.BOTTOM_RIGHT
          });
        })
        .finally(handleSpinner);
    }
  }
)(withRedux);

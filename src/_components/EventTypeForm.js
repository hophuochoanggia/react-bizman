import React from 'react';
import PropTypes from 'prop-types';
import Form from 'react-jsonschema-form';
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
  Input,
  Form as BSForm
} from 'reactstrap';
import FormBuilder from './FormBuilder';
import { Spinner } from './common';

const EventTypeForm = ({
  spinner,
  input,
  jsonString,
  schema,
  handleMetadata,
  handlePreview,
  handleSubmit,
  handleSpinner
}) => (
  <Row>
    <Col xs="12" sm="12" md="6" lg="6">
      <BSForm onSubmit={e => handleSubmit(e, handleSpinner)}>
        <Card>
          <CardHeader>
            <h3>Event Type</h3>
          </CardHeader>
          <CardBody>
            <Row>
              <Col xs="12" sm="12" md="12" lg="12">
                <FormGroup>
                  <Label>Type Name: *</Label>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Enter username"
                    defaultValue={input.name}
                    required
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs="12" sm="12" md="12" lg="12">
                <FormGroup>
                  <Label>Description: *</Label>
                  <Input
                    type="textarea"
                    name="description"
                    rows="5"
                    placeholder="Enter type description"
                    defaultValue={input.description}
                    required
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs="12" sm="12" md="12" lg="12">
                <FormGroup>
                  <Label>Metadata: *</Label>
                  <Input
                    type="textarea"
                    name="metadata"
                    rows="20"
                    placeholder="Enter from structure"
                    value={jsonString}
                    onChange={e => handleMetadata(e.target.value)}
                    required
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <FormBuilder />
            </Row>
          </CardBody>
          <CardFooter>
            {spinner ? (
              <Spinner />
            ) : (
              <React.Fragment>
                <Button type="submit" size="md" color="primary">
                  <i className="fa fa-dot-circle-o" /> Submit
                </Button>
                <Button type="submit" size="md" color="warning" onClick={handlePreview}>
                  <i className="fa fa-dot-circle-o" /> Preview Form
                </Button>
                <Button type="reset" size="md" color="danger">
                  <i className="fa fa-ban" /> Reset
                </Button>
              </React.Fragment>
            )}
          </CardFooter>
        </Card>
      </BSForm>
    </Col>
    <Col xs="12" sm="12" md="6" lg="6">
      <Card>
        <CardHeader>
          <h3>Preview</h3>
        </CardHeader>
        <CardBody>
          <Row>
            <Col>
              <Form schema={schema} />
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Col>
  </Row>
);

EventTypeForm.defaultProps = {
  input: {}
};

EventTypeForm.propTypes = {
  input: PropTypes.object,
  spinner: PropTypes.bool.isRequired,
  jsonString: PropTypes.string.isRequired,
  schema: PropTypes.object.isRequired,
  handleMetadata: PropTypes.func.isRequired,
  handlePreview: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleSpinner: PropTypes.func.isRequired
};

export default EventTypeForm;

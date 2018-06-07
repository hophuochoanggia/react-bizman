import React from 'react';
import { compose, withState, lifecycle } from 'recompose';
import { Row, Button, Col, Card, CardHeader, CardBody } from 'reactstrap';
import Form from 'react-jsonschema-form';

import { Spinner } from '../common';
import { withComponentError } from '../../_components/HOC/SpinnerError';
import Editor from '../CodeEditor';
import stringToJSX from '../../utils/stringToJSX';

const EnhanceForm = compose(
  lifecycle({
    state: { hasError: false, error: null },
    componentWillReceiveProps() {
      this.setState({ hasError: false });
    },
    componentDidCatch(error) {
      this.setState({ error, hasError: true });
    }
  }),
  withComponentError
)(Form);

const FormEditor = ({
  spinner,
  JSONSchema,
  UISchema,
  validJSONSchema,
  validUISchema,
  setJSONSchema,
  setUISchema,
  setValidJSONSchema,
  setValidUISchema,
  handleSubmit
}) => (
  <Row>
    <Col xs="12" sm="12" md="6" lg="6">
      <Editor
        title="Schema"
        valid={validJSONSchema}
        code={JSONSchema}
        handleChange={setJSONSchema}
        handleValid={setValidJSONSchema}
      />
      <Editor
        title="UISchema"
        valid={validUISchema}
        code={UISchema}
        handleChange={setUISchema}
        handleValid={setValidUISchema}
      />
    </Col>
    <Col xs="12" sm="12" md="6" lg="6">
      <Card>
        <CardHeader>Preview</CardHeader>
        <CardBody>
          <EnhanceForm schema={JSONSchema} uiSchema={stringToJSX(UISchema)}>
            {spinner ? (
              <Spinner />
            ) : (
              <Button
                color="primary"
                onClick={() => {
                  handleSubmit(validJSONSchema && validUISchema, JSONSchema, UISchema);
                }}
              >
                Update
              </Button>
            )}
          </EnhanceForm>
        </CardBody>
      </Card>
    </Col>
  </Row>
);

export default compose(
  withState('JSONSchema', 'setJSONSchema', ({ JSONSchema }) => JSONSchema),
  withState('UISchema', 'setUISchema', ({ UISchema }) => UISchema),
  withState('validJSONSchema', 'setValidJSONSchema', true),
  withState('validUISchema', 'setValidUISchema', true)
)(FormEditor);

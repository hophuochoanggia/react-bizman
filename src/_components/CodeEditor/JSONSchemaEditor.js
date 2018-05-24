import React from 'react';
import { compose, withState, lifecycle } from 'recompose';
import { Row, Button, Col, Card, CardHeader, CardBody } from 'reactstrap';
import Form from 'react-jsonschema-form';

import ControlSpinner from '../../_components/HOC/ControlSpinner';
import { withComponentError } from '../../_components/HOC/SpinnerError';
import toast from '../../utils/toast';
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
  JSONSchema,
  UISchema,
  validJSONSchema,
  validUISchema,
  setJSONSchema,
  setUISchema,
  setValidJSONSchema,
  setValidUISchema,
  mutate
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
            <Button
              color="primary"
              onClick={() => {
                if (validJSONSchema && validUISchema) {
                  mutate({
                    variables: {
                      name: 'REFERRAL-METADATA',
                      data: { setting: { JSONSchema, UISchema } }
                    }
                  })
                    .then(() => toast.success('Config Update'))
                    .catch(() => toast.success('Error updating config'));
                } else {
                  toast.error('Setting has errors');
                }
              }}
            >
              Update
            </Button>
          </EnhanceForm>
        </CardBody>
      </Card>
    </Col>
  </Row>
);

export default compose(
  withState('JSONSchema', 'setJSONSchema', ({ input }) => input.JSONSchema),
  withState('UISchema', 'setUISchema', ({ input }) => input.UISchema),
  withState('validJSONSchema', 'setValidJSONSchema', true),
  withState('validUISchema', 'setValidUISchema', true),
  ControlSpinner
)(FormEditor);

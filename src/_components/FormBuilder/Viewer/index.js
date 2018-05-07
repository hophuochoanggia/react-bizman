import React from 'react';
import { Input, Row, Col, FormGroup, Label } from 'reactstrap';
import { compose, branch, renderComponent, withHandlers } from 'recompose';
import DatePicker from 'react-datepicker';

const TextField = props => (
  <Col>
    <FormGroup>
      <Label>{props.title}</Label>
      <Input
        type="text"
        value={props.data || ''}
        onChange={e => {
          props.handleElement(props.name, e.target.value);
        }}
      />
    </FormGroup>
  </Col>
);
const DateField = props => (
  <Col>
    <FormGroup>
      <Label>{props.title}</Label>
      <DatePicker
        dateFormat="DD/MM/YYYY"
        customInput={<Input name="birthday" />}
        value={props.data || null}
        onChange={e => props.handleElement(props.name, e.format('DD/MM/YYYY'))}
      />
    </FormGroup>
  </Col>
);

const FormBranch = compose(
  branch(props => props.type === 'text', renderComponent(TextField)),
  branch(props => props.type === 'date', renderComponent(DateField))
)(() => <div>This element is not valid</div>);

const FormViewer = ({ schema, data, handleElement }) => (
  <React.Fragment>
    {schema.map(field => (
      <Row key={field.key}>
        <FormBranch {...field} data={data[field.name]} handleElement={handleElement} />
      </Row>
    ))}
  </React.Fragment>
);

export default withHandlers({
  handleElement: ({ data, handleData }) => (key, value) => {
    handleData({
      ...data,
      [key]: value
    });
  }
})(FormViewer);

import React from 'react';
import { branch, renderComponent, compose } from 'recompose';
import { Button, Card, CardHeader, FormGroup, Label, Input } from 'reactstrap';

const TextEditor = props => (
  <Card>
    <CardHeader>
      <FormGroup>
        <Label>Type: {props.type.toUpperCase()}</Label>
        <span className="float-right">
          <Button color="danger" onClick={props.deleteElement}>
            Delete
          </Button>
        </span>
      </FormGroup>
      <FormGroup>
        <Label>Name</Label>
        <Input
          type="text"
          placeholder="Enter Key"
          value={props.name}
          onChange={e => props.handleElement('name', e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label>Label</Label>
        <Input
          type="text"
          placeholder="Enter Title"
          value={props.title}
          onChange={e => props.handleElement('title', e.target.value)}
        />
      </FormGroup>
    </CardHeader>
  </Card>
);
const SelectEditor = props => <p>SelectEditor</p>;

const FormBuidlerEdit = compose(
  branch(props => props.type === 'text' || 'date', renderComponent(TextEditor)),
  branch(props => props.type === 'select', renderComponent(SelectEditor))
)(() => <div>This element is not valid</div>);

export default FormBuidlerEdit;

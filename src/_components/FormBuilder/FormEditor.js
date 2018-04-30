import React from 'react';
import { branch, renderComponent, compose } from 'recompose';
import { Button, Card, CardHeader, FormGroup, Label, Input } from 'reactstrap';

const TextEditor = props => (
  <Card>
    <CardHeader>
      <FormGroup>
        <Label>Type: Text</Label>
        <span className="float-right">
          <Button color="danger" onClick={props.deleteElement}>
            Delete
          </Button>
        </span>
      </FormGroup>
      <FormGroup>
        <Label>Title</Label>
        <Input
          type="text"
          placeholder="Enter Title"
          value={props.data.title}
          onChange={e => props.handleElement('title', e.target.value)}
        />
      </FormGroup>
    </CardHeader>
  </Card>
);

const SelectEditor = props => <p>SelectEditor</p>;
const TextCheck = test => branch(test, renderComponent(TextEditor));
const SelectCheck = test => branch(test, renderComponent(SelectEditor));

const FormBuidlerEdit = compose(
  TextCheck(props => props.data.type === 'text'),
  SelectCheck(props => props.data.type === 'select')
)(() => <div>This element is not valid</div>);

export default FormBuidlerEdit;

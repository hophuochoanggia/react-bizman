import React from 'react';
import PropTypes from 'prop-types';
import { compose, withState, withHandlers } from 'recompose';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import FormBuilderEdit from './FormEditor';

const typeGenerator = type => {
  switch (type) {
    case 'text':
      return {
        type: 'text',
        title: 'Title of field',
        name: 'Textfield',
        key: Math.random()
          .toString(36)
          .substring(7)
      };
    case 'date':
      return {
        type: 'date',
        title: 'Date',
        name: 'Datefield',
        key: Math.random()
          .toString(36)
          .substring(7)
      };
    default:
      return null;
  }
};

const FormBuilder = ({
  schema,
  handleSchema,
  handleElement,
  addElement,
  deleteElement,
  isDropdownOpen,
  toggle
}) => (
  <div>
    Form builder:&nbsp;
    <span>
      <ButtonDropdown isOpen={isDropdownOpen} toggle={toggle}>
        <DropdownToggle caret>Please select a type</DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => addElement('text')}>Text</DropdownItem>
          <DropdownItem onClick={() => addElement('date')}>Date</DropdownItem>
        </DropdownMenu>
      </ButtonDropdown>
    </span>
    <hr />
    {schema.map((el, i) => (
      <FormBuilderEdit {...el} handleElement={handleElement(i)} deleteElement={deleteElement(i)} />
    ))}
  </div>
);

const WithState = compose(
  withState('isDropdownOpen', 'toggleDropdown', false),
  withHandlers({
    toggle: ({ isDropdownOpen, toggleDropdown }) => () => {
      toggleDropdown(!isDropdownOpen);
    },
    handleElement: ({ schema, handleSchema }) => index => (key, value) => {
      const temp = {
        ...schema[index],
        [key]: value
      };
      const newSchema = [...schema];
      newSchema.splice(index, 1, temp);
      handleSchema(newSchema);
    },
    addElement: ({ schema, handleSchema }) => type => {
      const newSchema = [...schema, typeGenerator(type)];
      handleSchema(newSchema);
    },
    deleteElement: ({ schema, handleSchema }) => index => () => {
      const newSchema = schema.slice();
      newSchema.splice(index, 1);
      handleSchema(newSchema);
    }
  })
);

export default WithState(FormBuilder);

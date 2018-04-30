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
        title: '',
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
        </DropdownMenu>
      </ButtonDropdown>
    </span>
    <hr />
    {schema.map((el, i) => (
      <FormBuilderEdit
        key={el.key}
        data={el}
        handleElement={handleElement(i)}
        deleteElement={deleteElement(i)}
      />
    ))}
  </div>
);

const WithState = compose(
  withState('schema', 'updateSchema', ({ metadata }) => metadata),
  withState('isDropdownOpen', 'toggleDropdown', false),
  withHandlers({
    toggle: ({ isDropdownOpen, toggleDropdown }) => () => {
      toggleDropdown(!isDropdownOpen);
    },
    handleElement: ({ schema, updateSchema, syncSchema }) => index => (key, value) => {
      const newSchema = schema.slice();
      newSchema[index][key] = value;
      syncSchema(newSchema);
      updateSchema(newSchema);
    },
    addElement: ({ schema, updateSchema, syncSchema }) => type => {
      const newSchema = [...schema, typeGenerator(type)];
      syncSchema(newSchema);
      updateSchema(newSchema);
    },
    deleteElement: ({ schema, updateSchema, syncSchema }) => index => () => {
      const newSchema = schema.slice();
      newSchema.splice(index, 1);
      syncSchema(newSchema);
      updateSchema(newSchema);
    }
  })
);

export default WithState(FormBuilder);

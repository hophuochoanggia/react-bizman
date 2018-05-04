import React from 'react';
import PropTypes from 'prop-types';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import ControlDropdown from '../HOC/ControlDropdown';

const Base = ({
  title, items, isDropdownOpen, toggle, history
}) => (
  <ButtonDropdown isOpen={isDropdownOpen} toggle={toggle}>
    <DropdownToggle caret color="info">
      {title}
    </DropdownToggle>
    <DropdownMenu>
      {items.map(({ node }) => (
        <DropdownItem key={node._id} onClick={() => history.push('/event/new', { node })}>
          {node.name}
        </DropdownItem>
      ))}
    </DropdownMenu>
  </ButtonDropdown>
);
Base.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  toggle: PropTypes.func.isRequired,
  isDropdownOpen: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired
};

export default ControlDropdown(Base);

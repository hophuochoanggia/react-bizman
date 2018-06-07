import React from 'react';
import PropTypes from 'prop-types';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import ControlDropdown from '../HOC/ControlDropdown';

const Base = ({
  title, items, isDropdownOpen, toggle, history, patientId
}) => (
  <ButtonDropdown isOpen={isDropdownOpen} toggle={toggle}>
    <DropdownToggle caret color="info">
      {title}
    </DropdownToggle>
    <DropdownMenu>
      {items.map(node => (
        <DropdownItem key={node.type} onClick={() => history.push(node.link)}>
          {node.type}
        </DropdownItem>
      ))}
    </DropdownMenu>
  </ButtonDropdown>
);
Base.defaultProps = {
  items: []
};

Base.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.array,
  toggle: PropTypes.func.isRequired,
  isDropdownOpen: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired
};

export default ControlDropdown(Base);

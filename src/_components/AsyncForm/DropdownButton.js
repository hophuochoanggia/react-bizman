import React from 'react';
import { compose, mapProps } from 'recompose';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import { withSpinnerError, dropdownToggle } from '../../_components/HOC';
import { EVENTTYPES_QUERY } from '../../graphql/eventType';

const Base = ({
  items, isDropdownOpen, toggle, history
}) => (
  <ButtonDropdown isOpen={isDropdownOpen} toggle={toggle}>
    <DropdownToggle caret color="info">
      Add Event
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
  items: PropTypes.array.isRequired,
  toggle: PropTypes.func.isRequired,
  isDropdownOpen: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired
};

// eslint-disable-next-line
export const AddEventButton = compose(
  graphql(EVENTTYPES_QUERY),
  withSpinnerError,
  mapProps(({ data, history }) => ({
    items: data.eventTypes.edges,
    history
  })),
  dropdownToggle
)(Base);

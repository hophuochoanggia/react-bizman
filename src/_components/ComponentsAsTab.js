import React from 'react';
import classnames from 'classnames';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import PropTypes from 'prop-types';

const ComponentsAsTab = ({ tabs, ...props }) => (
  <React.Fragment>
    <Nav tabs>
      {tabs.map(({ name }, index) => (
        <NavItem key={name}>
          <NavLink
            className={classnames({
              active: props.tab === index
            })}
            onClick={() => {
              props.setTab(index);
            }}
          >
            {name}
          </NavLink>
        </NavItem>
      ))}
    </Nav>
    <TabContent activeTab={props.tab}>
      {tabs.map(({ name, Component }, index) => (
        <TabPane key={name} tabId={index}>
          <Component {...props} />
        </TabPane>
      ))}
    </TabContent>
  </React.Fragment>
);

ComponentsAsTab.propTypes = {
  tab: PropTypes.number.isRequired,
  tabs: PropTypes.array.isRequired,
  setTab: PropTypes.func.isRequired
};

export default ComponentsAsTab;

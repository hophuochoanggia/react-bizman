import React from 'react';
import { Badge } from 'reactstrap';
import PropTypes from 'prop-types';
import { branch, renderComponent, compose } from 'recompose';

const InfoBadge = ({ status }) => <Badge color="info">{status}</Badge>;
const DangerBadge = ({ status }) => <Badge color="danger">{status}</Badge>;
const SuccessBadge = ({ status }) => <Badge color="success">{status}</Badge>;

InfoBadge.propTypes = {
  status: PropTypes.string.isRequired
};

DangerBadge.propTypes = {
  status: PropTypes.string.isRequired
};

SuccessBadge.propTypes = {
  status: PropTypes.string.isRequired
};

export default compose(
  branch(({ status }) => status === 'REJECTED', renderComponent(DangerBadge)),
  branch(({ status }) => status === 'APPROVED', renderComponent(SuccessBadge))
)(InfoBadge);

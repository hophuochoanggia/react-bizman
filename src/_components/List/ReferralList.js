import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink
} from 'reactstrap';

import Badge from '../ColorByStatusBadge';

const List = ({ data, history }) => (
  <Row className="animated fadeIn">
    <Col>
      <Card>
        <CardHeader>
          <i className="fa fa-align-justify" />
        </CardHeader>
        <CardBody>
          <Table hover bordered striped responsive size="sm">
            <thead>
              <tr>
                <th>Fullname</th>
                <th>Birthday</th>
                <th>Email</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map(({ node }) => (
                <tr key={node._id} onClick={() => history.push(`/referral/${node._id}`)}>
                  <td>{node.fullName}</td>
                  <td>{moment(node.birthday).format('DD/MM/YYYY')}</td>
                  <td>{node.email}</td>
                  <td>
                    <Badge status={node.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Pagination>
            <PaginationItem disabled>
              <PaginationLink previous href="#">
                Prev
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink next href="#">
                Next
              </PaginationLink>
            </PaginationItem>
          </Pagination>
        </CardBody>
      </Card>
    </Col>
  </Row>
);

List.propTypes = {
  data: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired
};
export default List;

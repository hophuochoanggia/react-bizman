import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { withStateHandlers } from 'recompose';
import {
  Input,
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
import { USERS_QUERY } from '../../graphql/user';
import WithSpinnerError from '../../_components/HOC/SpinnerError';

const ListUser = WithSpinnerError(({
  handleForm, data: { users: { edges } }, role, history
}) => (
  <Row className="animated fadeIn">
    <Col>
      <Card>
        <CardHeader>
          <i className="fa fa-align-justify" />
          <span className="float-right">
            <Input
              type="select"
              name="role"
              id="role"
              defaultValue={role}
              onChange={event => handleForm(event.target.value)}
            >
              <option value="CONSULTANT">Consultant</option>
              <option value="SUPERADMIN">Superadmin</option>
              <option value="ADMIN">Admin</option>
              <option value="DOCTOR">Doctor</option>
              <option value="SPECIALIST">Specialist</option>
              <option value="DENTIST">Dentist</option>
            </Input>
          </span>
        </CardHeader>
        <CardBody>
          <Table hover bordered striped responsive size="sm">
            <thead>
              <tr>
                <th>Fullname</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {edges.map(({ node }) => (
                <tr key={node._id} onClick={() => history.push(`/user/${node._id}`)}>
                  <td>{node.fullName}</td>
                  <td>{node.email}</td>
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
));

ListUser.propTypes = {
  data: PropTypes.object.isRequired,
  handleForm: PropTypes.func.isRequired,
  role: PropTypes.string.isRequired
};

const withGraphQL = graphql(USERS_QUERY)(ListUser);

export default withStateHandlers(
  () => ({
    role: 'CONSULTANT'
  }),
  {
    handleForm: () => value => ({
      role: value
    })
  }
)(withGraphQL);

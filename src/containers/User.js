import React from 'react';
import PropTypes from 'prop-types';
import { compose, withStateHandlers } from 'recompose';
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
  PaginationLink,
  NavLink
} from 'reactstrap';
import { USERS_QUERY } from '../graphql';
import WithQuerySpinnerError from './HOC';
import capitalize from '../utils/capitalize';

const ListUser = ({ handleForm, data, role }) => (
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
          <Table responsive striped>
            <thead>
              <tr>
                <th>Fullname</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {data.map(({ node }) => (
                <tr key={node._id}>
                  <td>
                    <NavLink href={`/#/user/${node._id}`}>
                      {`${capitalize(node.firstName)} ${node.lastName.toUpperCase()}`}
                    </NavLink>
                  </td>
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
);

ListUser.propTypes = {
  data: PropTypes.array.isRequired,
  handleForm: PropTypes.func.isRequired
};

export default compose(withStateHandlers(
  ({ initial = 'CONSULTANT' }) => ({
    role: initial
  }),
  {
    handleForm: () => value => ({
      role: value
    })
  }
))(props => (
  <WithQuerySpinnerError
    Comp={ListUser}
    query={USERS_QUERY}
    variables={{ role: props.role }}
    forwardProps={props}
  />
));

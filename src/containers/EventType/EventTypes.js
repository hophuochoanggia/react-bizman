import React from 'react';
import { graphql } from 'react-apollo';
import { compose } from 'recompose';
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

import { EVENTTYPES_QUERY } from '../../graphql/eventType';
import { withSpinnerError } from '../../_components/HOC';

const EventTypes = props => {
  const data = props.data.eventTypes.edges;
  const { history } = props;
  return (
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
                  <th>Name</th>
                  <th>Description</th>
                  <th>Metadata</th>
                </tr>
              </thead>
              <tbody>
                {data.map(({ node }) => (
                  <tr key={node._id} onClick={() => history.push(`/eventType/${node._id}`)}>
                    <td>{node.name}</td>
                    <td>{node.description}</td>
                    <td>
                      <Input
                        type="textarea"
                        name="description"
                        rows="10"
                        value={JSON.stringify(node.metadata, null, 2)}
                        disabled
                      />
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
};

export default compose(graphql(EVENTTYPES_QUERY), withSpinnerError)(EventTypes);

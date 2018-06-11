import React from 'react';
import { Row, Col, Input } from 'reactstrap';
import DatePicker from 'react-datepicker';
import { pathOr, lensProp, set } from 'ramda';
import moment from 'moment';
import { graphql } from 'react-apollo';
import { FINISH_STUDY_TASK_MUTATION } from '../graphql/event';
import toast from '../utils/toast';

const StudyTasks = ({
  input, tasks, mutate, handleInputNestedAsValue
}) => {
  const handleClick = (date, index) => {
    console.log(input);
    mutate({ variables: { id: input._id, taskId: index, date } })
      .then(() => {
        toast.success('Updated Task');
        const tasks = pathOr([], ['data', 'study', 'tasks'], input);
        const newTasks = set(lensProp(index), { date }, tasks);
        handleInputNestedAsValue('study')('tasks')(newTasks);
      })
      .catch(e => toast.error(e.message.split(':')[1]));
  };
  return (
    <React.Fragment>
      Tasks
      {tasks.map((task, index) => {
        const taskDate = pathOr(null, [index, 'date'], input.data.study.tasks);
        return (
          <div key={task.key}>
            <Row>
              <Col xs="12" sm="12" md="2" lg="2">
                <DatePicker
                  dateFormat="DD/MM/YYYY"
                  selected={taskDate ? moment(taskDate) : null}
                  onChange={e => {
                    handleClick(e.format('YYYY-MM-DD'), index);
                  }}
                  customInput={<Input name="date" />}
                />
              </Col>
              <Col xs="12" sm="12" md="8" lg="8">
                description {task.description}
              </Col>
              <Col xs="12" sm="12" md="2" lg="2">
                User
              </Col>
            </Row>
            <br />
          </div>
        );
      })}
    </React.Fragment>
  );
};
export default graphql(FINISH_STUDY_TASK_MUTATION)(StudyTasks);

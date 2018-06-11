import React from 'react';
import { mapProps, withProps, compose } from 'recompose';
import { graphql } from 'react-apollo';
import Dropzone from 'react-dropzone';
import moment from 'moment';

import {
  Row,
  Col,
  Button,
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import { pathOr } from 'ramda';
import DatePicker from 'react-datepicker';

import ControlTab from '../../../_components/HOC/ControlTab';
import WithSpinnerError from '../../../_components/HOC/SpinnerError';
import isNewInUrl from '../../../_components/HOC/isNewInUrl';

import UserSelection from './UserSelection';
import { Spinner } from '../../common';
import ServiceAndSTOPForm from '../../ServiceAndSTOPForm';
import ComponentsAsTab from '../../ComponentsAsTab';
import StudyTasks from '../../StudyTasks';

import { CONFIG_QUERY } from '../../../graphql/config';

const EventTab = ({
  spinner,
  input,
  handleInputNested,
  handleInputNestedCheckbox,
  handleSubmit,
  handleSelect,
  handleFile,
  isNew = false,
  ...props
}) => (
  <Col xs="12" sm="12" md="12" lg="12">
    <Card>
      <CardHeader>
        <h3>Event Detail</h3>
      </CardHeader>
      <CardBody>
        <UserSelection input={input} handleSelect={handleSelect} {...props} />
        <br />
        <ServiceAndSTOPForm
          disabled={!isNew}
          service={input.data.service}
          STOP={input.data.STOP}
          handleInputNestedCheckbox={handleInputNestedCheckbox}
        />
        {isNew ? (
          <Col xs="12" sm="12" md="12" lg="12">
            <FormGroup>
              <Label>Additional clinical information:</Label>
              <Input
                type="text"
                name="add"
                value={pathOr('', ['data', 'notes', 'technician'], input)}
                onChange={handleInputNested('notes')('technician')}
              />
            </FormGroup>
          </Col>
        ) : null}
        <Col xs="12" sm="12" md="12" lg="12">
          <Dropzone
            style={{ width: '100%', height: '40%', border: '1px dashed black' }}
            onDrop={file => handleFile('referral')(file, 'referral')}
          >
            <p>Drop file or click to upload</p>
          </Dropzone>
          <aside>
            <h2>Uploaded files</h2>
            <ul>
              {input.data.referral &&
                input.data.referral.files &&
                input.data.referral.files.map(f => (
                  <li key={f.key}>
                    <a href={f.location}>{f.originalname}</a>
                  </li>
                ))}
            </ul>
          </aside>
        </Col>
      </CardBody>
      {isNew ? (
        <CardFooter>
          {spinner ? (
            <Spinner />
          ) : (
            <React.Fragment>
              <Button
                type="submit"
                size="md"
                color="primary"
                onClick={handleSubmit}
                disabled={spinner}
              >
                <i className="fa fa-dot-circle-o" /> Submit
              </Button>
            </React.Fragment>
          )}
        </CardFooter>
      ) : null}
    </Card>
  </Col>
);

const LoadTask = graphql(CONFIG_QUERY, {
  options: () => ({
    variables: {
      name: 'STUDY-TASK'
    }
  })
});

const TaskTab = ({
  input,
  handleSubmit,
  handleInputNested,
  handleInputNestedCheckbox,
  handleInputNestedAsValue,
  handleFile,
  tasks,
  spinner,
  ...props
}) => (
  <Col xs="12" sm="12" md="12" lg="12">
    <Card>
      {console.log(input)}
      <CardHeader>
        <h3>Tasks</h3>
      </CardHeader>
      <CardBody>
        <Row>
          <Col xs="12" sm="6" md="6" lg="6">
            <FormGroup>
              <Label>
                Note to Technician: {pathOr('N/A', ['data', 'notes', 'technician'], input)}
              </Label>
            </FormGroup>
          </Col>
          <Col xs="12" sm="6" md="6" lg="6">
            <FormGroup>
              <Label>Sleep Scientist Approval: {input.status}</Label>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs="12" sm="12" md="12" lg="12">
            <FormGroup>
              <Label>Sleep Study Appointment Date:</Label>
              <DatePicker
                dateFormat="DD/MM/YYYY"
                selected={moment(input.data.appointmentDate)}
                onChange={e =>
                  handleInputNestedAsValue('study')('appointment')(e.format('YYYY-MM-DD'))
                }
                customInput={<Input name="birthday" />}
              />
            </FormGroup>
            <FormGroup>
              <h2>Office Use</h2>
              <Label>Technician:</Label>
              <Input
                type="text"
                value={pathOr('', ['data', 'study', 'technician'], input)}
                onChange={handleInputNested('study')('technician')}
              />
            </FormGroup>
          </Col>
        </Row>
        <h2>Sleep Scientist Use</h2>
        <Row>
          <Col xs="12" sm="12" md="5" lg="5">
            <FormGroup>
              <Label>Sleep Scientist:</Label>
              <Input
                type="text"
                value={pathOr('', ['data', 'study', 'sleepScientist'], input)}
                onChange={handleInputNested('study')('sleepScientist')}
              />
            </FormGroup>
          </Col>
          <Col xs="12" sm="12" md="2" lg="2">
            <Label>Study pass/fail:</Label>
            <Col md="6">
              <FormGroup check inline>
                <Input
                  className="form-check-input"
                  type="checkbox"
                  id="inline-checkbox1"
                  name="inline-checkbox1"
                  onChange={handleInputNestedCheckbox('study')('isPass')}
                />
                <Label className="form-check-label" check htmlFor="inline-checkbox1">
                  Pass
                </Label>
              </FormGroup>
            </Col>
          </Col>
          <Col xs="12" sm="12" md="5" lg="5">
            <Label>Quality:</Label>
            <Col md="6">
              <FormGroup check inline>
                <Input
                  className="form-check-input"
                  type="radio"
                  id="inline-checkbox1"
                  name="inline-checkbox1"
                  value="poor"
                  onChange={handleInputNested('study')('quality')}
                />
                <Label className="form-check-label" check htmlFor="inline-checkbox1">
                  Poor
                </Label>
              </FormGroup>
              <FormGroup check inline>
                <Input
                  className="form-check-input"
                  type="radio"
                  id="inline-checkbox1"
                  name="inline-checkbox1"
                  value="fair"
                  onChange={handleInputNested('study')('quality')}
                />
                <Label className="form-check-label" check htmlFor="inline-checkbox1">
                  Fair
                </Label>
              </FormGroup>
              <FormGroup check inline>
                <Input
                  className="form-check-input"
                  type="radio"
                  id="inline-checkbox1"
                  name="inline-checkbox1"
                  value="excelent"
                  onChange={handleInputNested('study')('quality')}
                />
                <Label className="form-check-label" check htmlFor="inline-checkbox1">
                  Excellent
                </Label>
              </FormGroup>
            </Col>
          </Col>
        </Row>
        <Row>
          <Col xs="12" sm="12" md="12" lg="12">
            <FormGroup>
              <Label>Comments:</Label>
              <Input
                type="textarea"
                name="textarea-input"
                id="textarea-input"
                rows="5"
                value={pathOr('', ['data', 'study', 'comment'], input)}
                onChange={handleInputNested('study')('comment')}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs="12" sm="12" md="12" lg="12">
            <StudyTasks
              input={input}
              tasks={tasks}
              handleInputNestedAsValue={handleInputNestedAsValue}
            />
          </Col>
          <Col xs="12" sm="12" md="12" lg="12">
            <Dropzone
              style={{ width: '100%', height: '40%', border: '1px dashed black' }}
              onDrop={file => handleFile('study')(file, 'referral')}
            >
              <p>Drop file or click to upload</p>
            </Dropzone>
            <aside>
              <h2>Uploaded files</h2>
              <ul>
                {input.data.study &&
                  input.data.study.files &&
                  input.data.study.files.map(f => (
                    <li key={f.key}>
                      <a href={f.location}>{f.originalname}</a>
                    </li>
                  ))}
              </ul>
            </aside>
          </Col>
        </Row>
      </CardBody>
      <CardFooter>
        {spinner ? (
          <Spinner />
        ) : (
          <React.Fragment>
            <Button
              type="submit"
              size="md"
              color="primary"
              onClick={handleSubmit}
              disabled={spinner}
            >
              <i className="fa fa-dot-circle-o" /> Submit
            </Button>
          </React.Fragment>
        )}
      </CardFooter>
    </Card>
  </Col>
);
const EnhancedTaskTab = compose(
  LoadTask,
  WithSpinnerError,
  mapProps(({ data, ...props }) => ({
    ...props,
    tasks: data.config.edges[0].node.setting.tasks
  }))
)(TaskTab);

const EditEvent = compose(
  ControlTab,
  withProps({
    tabs: [
      {
        name: 'Event',
        Component: EventTab
      },
      {
        name: 'Task',
        Component: EnhancedTaskTab
      }
    ]
  })
)(ComponentsAsTab);

export default isNewInUrl(EventTab)(EditEvent);

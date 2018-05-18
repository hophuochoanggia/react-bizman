import React from 'react';
import PropTypes from 'prop-types';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import { Card, CardHeader, CardBody } from 'reactstrap';

import 'codemirror/mode/javascript/javascript';
import 'codemirror/lib/codemirror.css';

const cmOptions = {
  theme: 'default',
  height: 'auto',
  viewportMargin: Infinity,
  mode: {
    name: 'javascript',
    json: true,
    statementIndent: 2
  },
  lineNumbers: true,
  lineWrapping: true,
  indentWithTabs: false,
  tabSize: 2
};

const fromJson = val => JSON.stringify(val, null, 2);
const toJson = val => JSON.parse(val);

const Editor = props => (
  <Card>
    <CardHeader>
      <i className={`fa ${props.valid ? 'fa-check' : 'fa-close'} fa-lg`} /> {props.title}
    </CardHeader>
    <CardBody>
      <CodeMirror
        value={fromJson(props.code)}
        onChange={(editor, data, value) => {
          try {
            const j = toJson(value);
            props.handleValid(true);
            props.handleChange(j);
          } catch (e) {
            props.handleValid(false);
          }
        }}
        autoCursor={false}
        options={Object.assign({}, cmOptions, { theme: 'default' })}
      />
    </CardBody>
  </Card>
);
Editor.defaultProps = {
  title: 'N/A'
};

Editor.propTypes = {
  title: PropTypes.string,
  code: PropTypes.object.isRequired
  // onChange: PropTypes.func.isRequired
};

export default Editor;

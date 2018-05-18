import { graphql } from 'react-apollo';
import { compose, mapProps } from 'recompose';
import { path } from 'ramda';

import { CONFIG_QUERY, CONFIG_MUTATION_BY_NAME } from '../../graphql/config';
import WithSpinnerError from '../../_components/HOC/SpinnerError';

import JSONSchemaEditor from '../../_components/CodeEditor/JSONSchemaEditor';

const pathProps = ['edges', 0, 'node', 'setting'];
export default compose(
  graphql(CONFIG_QUERY, {
    options: () => ({
      variables: {
        name: 'REFERRAL-METADATA'
      }
    })
  }),
  WithSpinnerError,
  mapProps(({ data: { config } }) => ({ input: path(pathProps, config) })),
  graphql(CONFIG_MUTATION_BY_NAME)
)(JSONSchemaEditor);

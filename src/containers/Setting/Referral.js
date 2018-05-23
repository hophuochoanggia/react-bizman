import { graphql } from 'react-apollo';
import { compose, mapProps } from 'recompose';

import { CONFIG_QUERY, CONFIG_MUTATION_BY_NAME } from '../../graphql/config';
import WithSpinnerError from '../../_components/HOC/SpinnerError';
import JSONSchemaEditor from '../../_components/CodeEditor/JSONSchemaEditor';
import { configLens } from '../../utils/pathLens';

export default compose(
  graphql(CONFIG_QUERY, {
    options: () => ({
      variables: {
        name: 'REFERRAL-METADATA'
      }
    })
  }),
  WithSpinnerError,
  mapProps(({ data: { config } }) => ({ input: configLens(config) })),
  graphql(CONFIG_MUTATION_BY_NAME)
)(JSONSchemaEditor);

import React from 'react';
import { graphql } from 'react-apollo';
import { compose, mapProps, withHandlers } from 'recompose';

import { CONFIG_QUERY, CONFIG_MUTATION_BY_NAME } from '../../graphql/config';
import WithSpinnerError from '../../_components/HOC/SpinnerError';
import ControlSpinner from '../../_components/HOC/ControlSpinner';
import { configLens } from '../../utils/pathLens';
import toast from '../../utils/toast';

export default compose(
  graphql(CONFIG_QUERY, {
    options: () => ({
      variables: {
        name: 'REFERRAL-METADATA'
      }
    })
  }),
  WithSpinnerError,
  mapProps(({ data: { config } }) => {
    const lensData = configLens(config);
    return {
      JSONSchema: lensData.JSONSchema,
      UISchema: lensData.UISchema
    };
  }),
  ControlSpinner,
  graphql(CONFIG_MUTATION_BY_NAME),
  withHandlers({
    handleSubmit: ({ handleSpinner, mutate }) => (validJSON, JSONSchema, UISchema) => {
      if (!validJSON) {
        return toast.error('Setting has errors');
      }
      handleSpinner();
      mutate({
        variables: {
          name: 'REFERRAL-METADATA',
          data: { setting: { JSONSchema, UISchema } }
        }
      })
        .then(() => toast.success('Config Update'))
        .catch(() => toast.success('Error updating config'))
        .finally(handleSpinner);
    }
  })
)(() => <div>TODO: Allow admin to edit wording, no need coding here</div>);

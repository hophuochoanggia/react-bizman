/* eslint react/no-danger: 0 */
import React from 'react';

export default schema => {
  const result = {};
  Object.keys(schema).map(props => {
    const temp = { ...schema[props] };
    if (schema[props]['ui:help']) {
      temp['ui:help'] = (
        <div
          dangerouslySetInnerHTML={{
            __html: schema[props]['ui:help']
          }}
        />
      );
    }

    if (schema[props]['ui:description']) {
      temp['ui:description'] = (
        <div
          dangerouslySetInnerHTML={{
            __html: schema[props]['ui:description']
          }}
        />
      );
    }
    result[props] = temp;
  });
  return result;
};

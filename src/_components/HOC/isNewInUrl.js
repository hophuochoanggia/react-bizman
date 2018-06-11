import React from 'react';
import { branch, renderComponent } from 'recompose';

export default NewEvent =>
  branch(
    ({ match: { url } }) => url.includes('new'),
    renderComponent(props => <NewEvent isNew {...props} />)
  );

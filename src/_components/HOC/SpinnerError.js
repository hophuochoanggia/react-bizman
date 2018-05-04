import { branch, renderComponent, compose } from 'recompose';

import { Spinner, Error } from '../common';

const withSpinner = test => branch(test, renderComponent(Spinner));
const withError = test => branch(test, renderComponent(Error));

export default compose(
  withSpinner(props => props.data.loading),
  withError(props => props.data.error)
);

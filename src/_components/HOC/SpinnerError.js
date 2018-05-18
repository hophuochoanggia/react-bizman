import { branch, renderComponent, compose } from 'recompose';

import { Spinner, WithTokenExpireError, Error } from '../common';

export const withComponentError = branch(props => props.hasError, renderComponent(Error));

const withSpinner = test => branch(test, renderComponent(Spinner));
const withError = test => branch(test, renderComponent(WithTokenExpireError));

export default compose(
  withSpinner(props => props.data.loading),
  withError(props => props.data.error)
);

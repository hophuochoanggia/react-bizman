import { branch, renderComponent, compose } from 'recompose';

import { Spinner, Error } from '../_components/common';

const withSpinner = test => branch(test, renderComponent(Spinner));
const withError = test => branch(test, renderComponent(Error));

export default compose(
  withSpinner(props => props.data.loading === true),
  withError(props => props.data.error)
);

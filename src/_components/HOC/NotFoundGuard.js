import { branch, renderComponent } from 'recompose';
import { NotFoundError } from '../common';

export default test => branch(test, renderComponent(NotFoundError));

import { pathOr } from 'ramda';
import { branch, renderComponent } from 'recompose';
import { DashboardRedirect } from '../common';
import { ROUTEGUARD, ALLROLE } from '../../config';

export default branch(({ credential: { role }, match: { path } }) => pathOr(ALLROLE, [path], ROUTEGUARD).indexOf(role) === -1, renderComponent(DashboardRedirect));

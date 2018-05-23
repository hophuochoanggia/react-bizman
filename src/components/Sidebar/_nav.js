import SUPERADMIN from './RouteByRole/SUPERADMIN';
import DOCTOR from './RouteByRole/DOCTOR';

const routes = {
  SUPERADMIN,
  DOCTOR
};

const routeByRole = role => routes[role];

export default routeByRole;

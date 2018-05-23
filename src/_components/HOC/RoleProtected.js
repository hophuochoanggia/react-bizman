import React from 'react';
import { branch, renderComponent } from 'recompose';

import shouldRouteAllow from '../../utils/routePermission';

const RoleError = () => <div>Not Available</div>;

export default role =>
  branch(props => !shouldRouteAllow(props.name, role), renderComponent(RoleError));

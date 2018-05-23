import { pathOr } from 'ramda';

const roles = ['SUPERADMIN', 'ADMIN', 'CONSULTANT', 'DOCTOR', 'SPECIALIST', 'DENTIST', 'SCIENTIST'];
// save by name of the route
const routePermission = {
  NewUser: ['SUPERADMIN', 'ADMIN'],
  UserDetail: ['SUPERADMIN', 'ADMIN'],
  User: ['SUPERADMIN', 'ADMIN'],

  Patient: ['SUPERADMIN', 'ADMIN'],
  NewPatient: ['SUPERADMIN', 'ADMIN'],
  PatientDetail: ['SUPERADMIN', 'ADMIN'],

  EventType: ['SUPERADMIN'],
  NewEventType: ['SUPERADMIN'],
  EventTypeDetail: ['SUPERADMIN'],

  Event: ['SUPERADMIN', 'ADMIN'],
  NewEvent: ['SUPERADMIN', 'ADMIN']
};

export default (route, role) => {
  const permission = pathOr(roles, route, routePermission);
  return permission.indexOf(role) > -1;
};

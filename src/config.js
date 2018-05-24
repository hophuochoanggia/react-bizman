export const actionTypes = {
  SET_CREDENTIAL: 'SET_CREDENTIAL',

  START_SPINNER: 'START_SPINNER',
  STOP_SPINNER: 'STOP_SPINNER'
};

export const SUPERADMIN = 'SUPERADMIN';
export const ADMIN = 'ADMIN';
export const CONSULTANT = 'CONSULTANT';
export const DOCTOR = 'DOCTOR';
export const SPECIALIST = 'SPECIALIST';
export const DENTIST = 'DENTIST';
export const SCIENTIST = 'SCIENTIST';

export const ALLROLE = [SUPERADMIN, ADMIN, CONSULTANT, SPECIALIST, DENTIST, SCIENTIST];

export const OWNER = 'OWNER';
export const LEVEL = 'LEVEL';

export const ROUTEGUARD = {
  '/patient/': [SUPERADMIN, ADMIN],
  '/patient/new': [SUPERADMIN, ADMIN],
  '/patient/:id': [SUPERADMIN, ADMIN],

  '/referral/new': [DOCTOR],

  '/setting/referral': [SUPERADMIN]
};

export const GRAPHQL = 'http://localhost:8000/graphql';
// export const GRAPHQL = 'https://bizman-hoanggia.c9users.io:8080/graphql';

export const paginationLength = 20;

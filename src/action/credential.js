import { actionTypes } from '../config';

// eslint-disable-next-line
export const setLoginState = credential => ({
  type: actionTypes.SET_CREDENTIAL,
  credential
});

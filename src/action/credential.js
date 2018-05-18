import { actionTypes } from '../config';

// eslint-disable-next-line
export const setLoginState = isLoggedIn => {
  return {
    type: actionTypes.SET_CREDENTIAL,
    isLoggedIn
  };
};

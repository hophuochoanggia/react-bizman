import { actionTypes } from '../config';

export default (state = {}, action) => {
  switch (action.type) {
    case actionTypes.SET_CREDENTIAL:
      return {
        ...action.credential
      };
    default:
      return state;
  }
};

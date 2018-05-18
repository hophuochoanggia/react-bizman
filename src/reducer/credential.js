import { actionTypes } from '../config';

export default (state = {}, action) => {
  switch (action.type) {
    case actionTypes.SET_CREDENTIAL:
      return {
        ...state,
        isLoggedIn: action.isLoggedIn
      };
    default:
      return state;
  }
};

import { actionTypes } from '../config';

export default (state = false, action) => {
  switch (action.type) {
    case actionTypes.START_SPINNER:
      return true;
    case actionTypes.STOP_SPINNER:
      return false;
    default:
      return state;
  }
};

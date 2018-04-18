import { actionTypes } from '../config';

export const startSpinner = () => ({ type: actionTypes.START_SPINNER });

export const stopSpinner = () => ({
  type: actionTypes.STOP_SPINNER
});

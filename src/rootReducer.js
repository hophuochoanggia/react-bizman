import { combineReducers } from 'redux';
import credential from './reducer/credential';
import spinner from './reducer/spinner';

export default combineReducers({
  credential,
  spinner
});

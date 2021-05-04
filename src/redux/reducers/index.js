import { combineReducers } from 'redux';
import { authReducer } from './auth';
import { userReducer } from './user';

const reducers = combineReducers({
  user: userReducer,
  auth: authReducer,
});

export default reducers;

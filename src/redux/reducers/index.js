import { combineReducers } from 'redux';
import { authReducer } from './auth';
import { postReducer } from './post';
import { userReducer } from './user';

const reducers = combineReducers({
  user: userReducer,
  auth: authReducer,
  post: postReducer,
});

export default reducers;

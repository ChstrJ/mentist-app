// reducers/index.js
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import loginReducer from './loginReducer';
import signupReducer from './signupReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  login: loginReducer,
  signup: signupReducer
});

export default rootReducer;

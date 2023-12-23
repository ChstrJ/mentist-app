// reducers/index.js
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import loginReducer from './loginReducer';
import signupReducer from './signupReducer';
import appointmentReducer from './appointmentReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  login: loginReducer,
  signup: signupReducer,
  appointment: appointmentReducer,
});

export default rootReducer;

import {LOGIN_SET_USER_NAME, LOGIN_SET_PASSWORD} from '../actions/Action';

const initialState = {
  username: '',
  password: '',
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SET_USER_NAME:
      return {...state, username: action.payload};
    case LOGIN_SET_PASSWORD:
      return {...state, password: action.payload};
    default:
      return state;
  }
};

export default loginReducer;

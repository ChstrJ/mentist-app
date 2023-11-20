import {SET_USER_NAME, SET_PASSWORD} from '../actions/Action';

const initialState = {
  username: '',
  password: '',
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_NAME:
      return {...state, username: action.payload};
    case SET_PASSWORD:
      return {...state, password: action.payload};
    default:
      return state;
  }
};

export default loginReducer;

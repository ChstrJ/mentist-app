import {
  SIGNUP_SET_LAST_NAME,
  SIGNUP_SET_FIRST_NAME,
  SIGNUP_SET_PHONE_NUMBER,
  SIGNUP_SET_EMAIL,
  SIGNUP_SET_PASSWORD,
  SIGNUP_SET_USERNAME,
} from '../actions/Action';

initialState = {
  firstName: '',
  lastName: '',
  email: '',
  phone_no: '',
  username: '',
  password: '',
  isLoading: false,
  successModal: false,
  error: null,
};

const signupReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_SET_FIRST_NAME:
      return {...state, first_name: action.payload};
    case SIGNUP_SET_LAST_NAME:
      return {...state, last_name: action.payload};
    case SIGNUP_SET_EMAIL:
      return {...state, email: action.payload};
    case SIGNUP_SET_PHONE_NUMBER:
      return {...state,phone_number: action.payload};
    case SIGNUP_SET_PASSWORD:
      return {...state,password: action.payload};
    case SIGNUP_SET_USERNAME:
      return {...state,username: action.payload};
    default:
      return state;
  }
};

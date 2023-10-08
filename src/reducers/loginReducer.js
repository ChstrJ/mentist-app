import { LOGIN_SUCCESS, LOGIN_FAILURE } from "../actions/types/types";

// Define the initial state
const initialState = {
    isLoggingIn: false, 
    error: null, 
    username: null,
    password: null,
  };
  
  // Define the login reducer function
  const loginReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
        return {
          ...state,
          isLoggingIn: false,
          username: action.payload,
          password: action.payload,
          error: null,
        };
      case 'LOGIN_FAILURE':
        return {
          ...state,
          isLoggingIn: false,
          error: action.payload,
          user: null,
        };
      default:
        return state;
    }
  };
  
  export default loginReducer;
  
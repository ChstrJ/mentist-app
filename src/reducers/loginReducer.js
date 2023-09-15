
// Define the initial login state
const initialState = {
    isLoggingIn: false, // Indicates whether a login process is in progress
    error: null, // Stores any login error message
    user: null, // Stores the user data upon successful login
  };
  
  // Define the login reducer function
  const loginReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN_REQUEST':
        return {
          ...state,
          isLoggingIn: true,
          error: null,
        };
      case 'LOGIN_SUCCESS':
        return {
          ...state,
          isLoggingIn: false,
          user: action.payload,
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
  
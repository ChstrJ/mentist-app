// signupReducer.js

// Define the initial sign-up state
const initialState = {
    isSigningUp: false, // Indicates whether a sign-up process is in progress
    error: null, // Stores any sign-up error message
    user: null, // Stores the user data upon successful sign-up
  };
  
  // Define the sign-up reducer function
  const signupReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SIGNUP_REQUEST':
        return {
          ...state,
          isSigningUp: true,
          error: null,
        };
      case 'SIGNUP_SUCCESS':
        return {
          ...state,
          isSigningUp: false,
          user: action.payload,
          error: null,
        };
      case 'SIGNUP_FAILURE':
        return {
          ...state,
          isSigningUp: false,
          error: action.payload,
          user: null,
        };
      default:
        return state;
    }
  };
  
  export default signupReducer;
  
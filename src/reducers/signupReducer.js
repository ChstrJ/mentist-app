// signupReducer.js



const initialState = {
    isSigningUp: false, 
    error: null, 
    first_name: null, 
    last_name: null, 
    password: null,
    email: null,
    username: null,
    phone_no: null,

  };
  

  const signupReducer = (state = initialState, action) => {
    switch (action.type) {
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
  
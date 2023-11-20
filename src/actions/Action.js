

// login
export const LOGIN_SET_USER_NAME = 'LOGIN_SET_USER_NAME'
export const LOGIN_SET_PASSWORD = 'LOGIN_SET_PASSWORD'


//signup
export const SIGNUP_SET_FIRST_NAME = 'SIGNUP_SET_FIRST_NAME'
export const SIGNUP_SET_LAST_NAME = 'SIGNUP_SET_LAST_NAME'
export const SIGNUP_SET_EMAIL = 'SIGNUP_SET_EMAIL'
export const SIGNUP_SET_USER_NAME = 'SIGNUP_SET_USER_NAME'
export const SIGNUP_SET_PHONE_NUMBER = 'SIGNUP_SET_PHONE_NUMBER'
export const SIGNUP_SET_PASSWORD = 'SIGNUP_SET_PASSWORD'






export const setUserName = username => dispatch => {
  dispatch({
      type: LOGIN_SET_USER_NAME,
      payload: username,
  })
}

export const setPassword = password => dispatch => {
  dispatch({
      type: LOGIN_SET_PASSWORD,
      payload: password,
  })
}








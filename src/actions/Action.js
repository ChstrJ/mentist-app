import { LOGIN_SUCCESS, LOGIN_FAILURE } from "./types/types";
import { SIGNUP_SUCCESS, SIGNUP_FAILURE } from "./types/types";

export const loginSuccess = (userData) => ({
  type: LOGIN_SUCCESS,
  payload: userData,
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const signupSucess = (userData) => ({
  type: SIGNUP_SUCCESS,
  payload: userData,
});

export const signupFailure = (error) => ({
  type: SIGNUP_FAILURE,
  payload: error,
});







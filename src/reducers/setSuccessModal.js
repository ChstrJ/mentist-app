// actions.js

export const SET_SUCCESS_MODAL = 'SET_SUCCESS_MODAL';

export const setSuccessModal = (isVisible) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch({
        type: SET_SUCCESS_MODAL,
        payload: isVisible,
      });
    }, 1000);
  };
};

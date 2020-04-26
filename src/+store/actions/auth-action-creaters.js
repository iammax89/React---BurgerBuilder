import * as types from "./actionTypes";
import Axios from "axios";

export const authInit = () => {
  return {
    type: types.AUTH_INIT
  };
};

export const authSuccess = data => {
  return {
    type: types.AUTH_SUCCESS,
    payload: {
      token: data.idToken,
      userId: data.localId
    }
  };
};

export const authFail = error => {
  return {
    type: types.AUTH_FAIL,
    payload: error
  };
};

export const auth = (email, password, isSignUp) => {
  let url =
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAKIFpRwcB5MhTPXQBJkVz5xqhs8njZk3g";
  const payload = {
    email: email,
    password: password,
    returnSecureToken: true
  };
  return dispatch => {
    dispatch(authInit());
    if (!isSignUp) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:resetPassword?key=AIzaSyAKIFpRwcB5MhTPXQBJkVz5xqhs8njZk3g";
    }
    Axios.post(url, payload)
      .then(Response => {
        console.log(Response);
        dispatch(authSuccess(Response.data));
      })
      .catch(Error => {
        console.error(Error.message);
        dispatch(authFail(Error.message));
      });
  };
};

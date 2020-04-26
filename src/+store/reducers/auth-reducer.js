import * as types from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false
};

const authInit = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.payload.token,
    userId: action.payload.userId,
    error: null,
    loading: false
  });
};

const authFailed = (state, action) => {
  return updateObject(state, {
    error: action.payload,
    loading: false
  });
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.AUTH_INIT:
      return authInit(state, action);

    case types.AUTH_SUCCESS:
      return authSuccess(state, action);

    case types.AUTH_FAIL:
      return authFailed(state, action);

    default:
      return state;
  }
};

export default authReducer;

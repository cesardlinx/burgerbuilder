import actionTypes from '../actions/actionTypes';

const initialState = {
  token: null,
  userId: null,
  error: null,
  isLoading: false
};

const authStart = (state, action) => {
  return {
    ...state,
    error: null,
    isLoading: true
  }
};
const authSuccess = (state, action) => {
  return {
    ...state,
    token: action.authData.idToken,
    error: null,
    userId: action.authData.localId,
    isLoading: false
  }
};
const authFail = (state, action) => {
  return {
    ...state,
    token: null,
    userId: null,
    error: action.error,
    isLoading: false
  }
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);

    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);

    case actionTypes.AUTH_FAIL:
      return authFail(state, action);

    default:
      return state;
  }
}

export default authReducer;
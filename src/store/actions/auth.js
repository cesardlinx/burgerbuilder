import actionTypes from './actionTypes';
import axios from 'axios';

const API_KEY = 'AIzaSyD5snSHF3VY4H9x1P9PUiQmQTvCgtgQncQ'

const authStart = () => {
  return { type: actionTypes.AUTH_START };
};

const authSuccess = (authData) => {
  return { type: actionTypes.AUTH_SUCCESS, authData };
};

export const authFail = (error) => {
  return { type: actionTypes.AUTH_FAIL, error };
};


export const auth = (payload, isSignup) => {
  return dispatch => {
    dispatch(authStart());
    let urlDirection = 'verifyPassword'
    if (isSignup) {
      urlDirection = 'signupNewUser'
    }
    const url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/${urlDirection}?key=${API_KEY}`;

    axios.post(url, {
      email: payload.email,
      password: payload.password,
      returnSecureToken: true
    }).then(response => {
      dispatch(authSuccess(response.data));
    }).catch(error=>{
      dispatch(authFail(error.response.data.error));
    })
  };
};


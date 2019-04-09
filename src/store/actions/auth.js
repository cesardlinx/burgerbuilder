import actionTypes from './actionTypes';
import axios from 'axios';

const API_KEY = process.env.REACT_APP_API_KEY;

const authStart = () => {
  return { type: actionTypes.AUTH_START };
};

const authSuccess = ({ idToken, localId }) => {
  return { type: actionTypes.AUTH_SUCCESS, idToken, localId };
};

export const authFail = (error) => {
  return { type: actionTypes.AUTH_FAIL, error };
};


export const authLogout = () => {
  // local storage remove
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');

  return { type: actionTypes.AUTH_LOGOUT };
};


export const checkAuthTimeout = (expirationTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(authLogout());
    }, expirationTime * 1000);
  };
};


export const auth = ({ email, password }, isSignup) => {
  return dispatch => {
    dispatch(authStart());
    let urlDirection = 'verifyPassword'
    if (isSignup) {
      urlDirection = 'signupNewUser'
    }
    const url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/${urlDirection}?key=${API_KEY}`;

    axios.post(url, {
      email: email,
      password: password,
      returnSecureToken: true
    }).then(response => {
      // setting local storage
      const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);

      localStorage.setItem('token', response.data.idToken);
      localStorage.setItem('expirationDate', expirationDate);

      dispatch(authSuccess(response.data));
      dispatch(checkAuthTimeout(response.data.expiresIn));
    }).catch(error=>{
      dispatch(authFail(error.response.data.error));
    })
  };
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if (token) {

      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      const now = new Date();



      if (expirationDate > now) {

        const url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/getAccountInfo?key=${API_KEY}`;

        axios.post(url, {
          idToken: token
        }).then(
          response => {
            dispatch(authSuccess({
              idToken: token,
              localId: response.data.users[0].localId
            }));
          }
        ).catch(
          error => {
            dispatch(authLogout());
          }
        )

        const expirationTime = new Date(expirationDate).getTime() - now.getTime();

        dispatch(checkAuthTimeout(expirationTime / 1000));

      } else {
        dispatch(authLogout());
      }
    } else {
      dispatch(authLogout());
    }
  }
}

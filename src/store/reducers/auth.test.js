import reducer from './auth';
import actionTypes from '../actions/actionTypes';

describe('Auth reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      token: null,
      userId: null,
      error: null,
      isLoading: false
    });
  });

  it('should store the token upon login', () => {
    expect(reducer(undefined, {
      type: actionTypes.AUTH_SUCCESS,
      idToken: 'some-token',
      localId: 'some-user-id'
    })).toEqual({
      token: 'some-token',
      userId: 'some-user-id',
      error: null,
      isLoading: false
    });
  });

  it('should start authentication process', () => {
    expect(reducer(undefined, { type: actionTypes.AUTH_START })).toEqual({
      token: null,
      userId: null,
      error: null,
      isLoading: true
    });
  });

  it('should fail authentication process', () => {
    expect(reducer(undefined, { type: actionTypes.AUTH_FAIL, error: true })).toEqual({
      token: null,
      userId: null,
      error: true,
      isLoading: false
    });
  });

  it('should delete all info on logout', () => {
    expect(reducer({
      token: 'some-token',
      userId: 'userId',
      error: null,
      isLoading: false
    }, { type: actionTypes.AUTH_LOGOUT, error: true })).toEqual({
      token: null,
      userId: null,
      error: null,
      isLoading: false
    });
  });


});
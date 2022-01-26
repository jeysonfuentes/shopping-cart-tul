import { createReducer, on } from '@ngrx/store';
import * as authActions from './auth.actions';
import { AuthAppState, defaultAuthState } from './auth.model';

// * Interests

export const authInitialState: AuthAppState = defaultAuthState;

const _authReducer = createReducer(
  authInitialState,
  on(authActions.LoginUser, _loginUser()),
  on(authActions.LoginUserSuccess, _loginUserSuccess()),
  on(authActions.LoginUserError, _loginUserError()),
  on(authActions.SignUpUser, _signUpUser()),
  on(authActions.SignUpUserSuccess, _signUpUserSuccess()),
  on(authActions.SignUpUserError, _signUpUserError()),
  on(authActions.LogOut, _logOut()),
  on(authActions.LogOutSuccess, _logOutSuccess()),
  on(authActions.LogOutError, _logOutError()),

);

export function authReducer(state: AuthAppState, action: any) {
  return _authReducer(state, action);
}

function _loginUser() {
  return (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  });
}

function _loginUserSuccess() {
  return (state, { user }) => ({
    ...state,
    currentUser: user,
    loading: false,
    loaded: true,
    error: null,
  });
}

function _loginUserError() {
  return (state, { error }) => ({
    ...state,
    loading: false,
    loaded: true,
    error,
  });
}

function _signUpUser() {
  return (state) => ({
    ...state,
    loading: true,
    loaded: false,
  });
}

function _signUpUserSuccess() {
  return (state, { user }) => ({
    ...state,
    loading: false,
    loaded: true,
    error: null,
  });
}

function _signUpUserError() {
  return (state, { error }) => ({
    ...state,
    loading: false,
    loaded: true,
    error,
  });
}

function _logOut() {
  return (state: AuthAppState): AuthAppState => ({
    ...state,
    loading: true,
    loaded: false,
  });
}

function _logOutSuccess() {
  return (state) => ({
    ...state,
    currentUser: null,
    loading: false,
    loaded: true,
    error: null,
  });
}

function _logOutError() {
  return (state, { error }) => ({
    ...state,
    loading: false,
    loaded: true,
    error,
  });
}



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
  on(authActions.SingUpUser, _singUpUser()),
  on(authActions.SingUpUserSuccess, _singUpUserSuccess()),
  on(authActions.SingUpUserError, _singUpUserError()),
  on(authActions.SingOutUser, _singOutUser())
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

function _singUpUser() {
  return (state) => ({
    ...state,
    loading: true,
    loaded: false,
  });
}

function _singUpUserSuccess() {
  return (state, { user }) => ({
    ...state,
    loading: false,
    loaded: true,
    error: null,
  });
}

function _singUpUserError() {
  return (state, { error }) => ({
    ...state,
    loading: false,
    loaded: true,
    error,
  });
}

function _singOutUser() {
  return (state: AuthAppState): AuthAppState => ({
    ...state,
    currentUser: null,
  });
}



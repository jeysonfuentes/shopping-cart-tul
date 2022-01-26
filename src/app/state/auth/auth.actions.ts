import { createAction, props } from '@ngrx/store';
import { User } from 'src/core/models/user.model';
import { LoginCredentials } from './auth.interfaces';


export enum AuthActionTypes {
  Login = '[Auth] Login',
  LoginUserSuccess = '[Auth] LoginUserSuccess',
  LoginUserError = '[Auth] LoginUserError',
  SignUp = '[Auth] SignUp',
  SignUpUserSuccess = '[Auth] SignUpUserSuccess',
  SignUpUserError = '[Auth] SignUpUserError',
  LogOut = '[Auth] LogOut',
  LogOutSuccess = '[Auth] LogOutSuccess',
  LogOutError = '[Auth] LogOutError',
}

export const LoginUser = createAction(
  AuthActionTypes.Login,
  props<{ credentials: LoginCredentials, remenberMe: boolean}>()
);
export const LoginUserSuccess = createAction(
  AuthActionTypes.LoginUserSuccess,
  props<{ user: User }>()
);
export const LoginUserError = createAction(
  AuthActionTypes.LoginUserError,
  props<{ error: any }>()
);
export const SignUpUser = createAction(
  AuthActionTypes.SignUp,
  props<{ credentials: LoginCredentials }>()
);
export const SignUpUserSuccess = createAction(
  AuthActionTypes.SignUpUserSuccess,
  props<{ user: User }>()
);
export const SignUpUserError = createAction(
  AuthActionTypes.SignUpUserError,
  props<{ error: any }>()
);

export const LogOut = createAction(
  AuthActionTypes.LogOut
);
export const LogOutSuccess = createAction(
  AuthActionTypes.LogOutSuccess
);
export const LogOutError = createAction(
  AuthActionTypes.LogOutError,
  props<{ error: any }>()
);


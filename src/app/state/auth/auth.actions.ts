import { createAction, props } from '@ngrx/store';
import { User } from 'src/core/models/user.model';
import { LoginCredentials } from './auth.interfaces';


export enum AuthActionTypes {
  Login = '[Auth] Login',
  LoginUserSuccess = '[Auth] LoginUserSuccess',
  LoginUserError = '[Auth] LoginUserError',
  SingUp = '[Auth] SingUp',
  SingUpUserSuccess = '[Auth] SingUpUserSuccess',
  SingUpUserError = '[Auth] SingUpUserError',
  SingOut = '[Auth] SingOut',
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
export const SingUpUser = createAction(
  AuthActionTypes.SingUp,
  props<{ credentials: LoginCredentials }>()
);
export const SingUpUserSuccess = createAction(
  AuthActionTypes.SingUpUserSuccess,
  props<{ user: User }>()
);
export const SingUpUserError = createAction(
  AuthActionTypes.SingUpUserError,
  props<{ error: any }>()
);

export const SingOutUser = createAction(AuthActionTypes.SingOut);

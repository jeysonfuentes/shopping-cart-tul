import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './app.model';
import * as fromAuth from './auth/auth.reducer';


export const appReducers: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
};

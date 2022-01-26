import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './app.model';
import * as fromAuth from './auth/auth.reducer';
import * as fromShoppingCart from '../shopping-cart/state/shopping-cart.reducer';


export const appReducers: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  shoppingCart: fromShoppingCart.shoppingCartReducer
};

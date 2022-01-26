import { ShoppingCartState } from '../shopping-cart/state/shopping-cart.model';
import { AuthAppState } from './auth/auth.model';

export interface AppState {
  auth: AuthAppState;
  shoppingCart: ShoppingCartState;
}

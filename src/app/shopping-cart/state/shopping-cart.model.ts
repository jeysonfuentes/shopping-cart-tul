import { AppState } from 'src/app/state/app.model';
import { Cart } from 'src/core/models/cart.model';
import { ProductCart } from 'src/core/models/product-cart.model';

export interface AppStateShoppingCart extends AppState {
  shoppingCart: ShoppingCartState;

}
export interface ShoppingCartState {
  cart: Cart;
  productsCart: ProductCart[];
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const defaultShoppingCartState: ShoppingCartState = {
  cart: null,
  productsCart: [],
  loading: false,
  loaded: false,
  error: null,
};

import { map } from 'rxjs/operators';
import { createReducer, on } from '@ngrx/store';
import {
  defaultShoppingCartState,
  ShoppingCartState,
} from './shopping-cart.model';
import * as shoppingCartActions from './shopping-cart.actions';

export const shoppingCartInitialState: ShoppingCartState =
  defaultShoppingCartState;

const _shoppingCartReducer = createReducer(
  shoppingCartInitialState,
  on(shoppingCartActions.GetShoppingCart, _getShoppingCart()),
  on(shoppingCartActions.GetShoppingCartSuccess, _getShoppingCartSuccess()),
  on(shoppingCartActions.GetShoppingCartFailure, _getShoppingCartFailure()),
  on(shoppingCartActions.AddShoppingCart, _addShoppingCart()),
  on(shoppingCartActions.AddShoppingCartSuccess, _addShoppingCartSuccess()),
  on(shoppingCartActions.AddShoppingCartFailure, _addShoppingCartFailure()),
  on(shoppingCartActions.CompleteShoppingCart, _completeShoppingCart()),
  on(
    shoppingCartActions.CompleteShoppingCartSuccess,
    _completeShoppingCartSuccess()
  ),
  on(
    shoppingCartActions.CompleteShoppingCartFailure,
    _completeShoppingCartFailure()
  ),
  on(shoppingCartActions.GetProductsCart, _getProductsCart()),
  on(shoppingCartActions.GetProductsCartSuccess, _getProductsCartSuccess()),
  on(shoppingCartActions.GetProductsCartFailure, _getProductsCartFailure()),
  on(shoppingCartActions.AddProductCart, _addProductCart()),
  on(shoppingCartActions.AddProductCartSuccess, _addProductCartSuccess()),
  on(shoppingCartActions.AddProductCartFailure, _addProductCartFailure()),
  on(shoppingCartActions.RemoveProductCart, _removeProductCart()),
  on(shoppingCartActions.RemoveProductCartSuccess, _removeProductCartSuccess()),
  on(shoppingCartActions.RemoveProductCartFailure, _removeProductCartFailure()),
  on(shoppingCartActions.UpdateProductCart, _updateProductCart()),
  on(shoppingCartActions.UpdateProductCartSuccess, _updateProductCartSuccess()),
  on(shoppingCartActions.UpdateProductCartFailure, _updateProductCartFailure()),
  on(
    shoppingCartActions.AddProductCartWhenNotExistShoppingCart,
    _addProductCartWhenNotExistShoppingCart()
  ),
  on(
    shoppingCartActions.AddProductCartWhenNotExistShoppingCartSuccess,
    _addProductCartWhenNotExistShoppingCartSuccess()
  ),
  on(
    shoppingCartActions.AddProductCartWhenNotExistShoppingCartFailure,
    _addProductCartWhenNotExistShoppingCartFailure()
  )
);

export function shoppingCartReducer(state: ShoppingCartState, action: any) {
  return _shoppingCartReducer(state, action);
}

function _getShoppingCart() {
  return (state) => ({
    ...state,
    loading: true,
  });
}

function _getShoppingCartSuccess() {
  return (state, { cart }) => {
    return {
      ...state,
      cart,
      loading: false,
      loaded: true,
    };
  };
}

function _getShoppingCartFailure() {
  return (state, error) => ({
    ...state,
    loading: false,
    loaded: false,
    error,
  });
}

function _addShoppingCart() {
  return (state) => ({
    ...state,
    loading: true,
  });
}

function _addShoppingCartSuccess() {
  return (state, { cart }) => {
    return {
      ...state,
      cart,
      loading: false,
      loaded: true,
    };
  };
}

function _addShoppingCartFailure() {
  return (state, error) => ({
    ...state,
    loading: false,
    loaded: false,
    error,
  });
}

function _completeShoppingCart() {
  return (state) => ({
    ...state,
    loading: true,
  });
}

function _completeShoppingCartSuccess() {
  return (state) => {
    return {
      ...state,
      loading: false,
      loaded: true,
    };
  };
}

function _completeShoppingCartFailure() {
  return (state, error) => ({
    ...state,
    loading: false,
    loaded: false,
    error,
  });
}

function _getProductsCart() {
  return (state) => ({
    ...state,
    loading: true,
  });
}

function _getProductsCartSuccess() {
  return (state, { productsCart }) => {
    return {
      ...state,
      productsCart,
      loading: false,
      loaded: true,
    };
  };
}

function _getProductsCartFailure() {
  return (state, error) => ({
    ...state,
    loading: false,
    loaded: false,
    error,
  });
}

function _addProductCartWhenNotExistShoppingCart() {
  return (state) => ({
    ...state,
    loading: true,
  });
}

function _addProductCartWhenNotExistShoppingCartSuccess() {
  return (state, { cart, productCart }) => {
    return {
      ...state,
      cart,
      productsCart: [...state.productsCart].push(productCart),
      loading: false,
      loaded: true,
    };
  };
}

function _addProductCartWhenNotExistShoppingCartFailure() {
  return (state, error) => ({
    ...state,
    loading: false,
    loaded: false,
    error,
  });
}

function _addProductCart() {
  return (state) => ({
    ...state,
    loading: true,
  });
}

function _addProductCartSuccess() {
  return (state, { productCart }) => {
    return {
      ...state,
      productsCart: state.productsCart.concat({ productCart }),
      loading: false,
      loaded: true,
    };
  };
}

function _addProductCartFailure() {
  return (state, error) => ({
    ...state,
    loading: false,
    loaded: false,
    error,
  });
}

function _removeProductCart() {
  return (state) => ({
    ...state,
    loading: true,
  });
}

function _removeProductCartSuccess() {
  return (state) => {
    return {
      ...state,
      loading: false,
      loaded: true,
    };
  };
}

function _removeProductCartFailure() {
  return (state, error) => ({
    ...state,
    loading: false,
    loaded: false,
    error,
  });
}

function _updateProductCart() {
  return (state) => ({
    ...state,
    loading: true,
  });
}

function _updateProductCartSuccess() {
  return (state) => {
    return {
      ...state,
      loading: false,
      loaded: true,
    };
  };
}

function _updateProductCartFailure() {
  return (state, error) => ({
    ...state,
    loading: false,
    loaded: false,
    error,
  });
}

import { createReducer, on } from '@ngrx/store';
import { defaultProductState, ProductState } from './product.model';
import * as productActions from './product.actions';

export const productInitialState: ProductState = defaultProductState;

const _productReducer = createReducer(
  productInitialState,
  on(productActions.GetProducts, _getProducts()),
  on(productActions.GetProductsSuccess, _getProductsSuccess()),
  on(productActions.GetProductsFailure, _getProductsFailure())
);

export function productReducer(state: ProductState, action: any) {
  return _productReducer(state, action);
}

function _getProducts() {
  return (state) => ({
    ...state,
    loading: true,
  });
}

function _getProductsSuccess() {
  return (state, { products }) => {
    return {
      ...state,
      products,
      loading: false,
      loaded: true,
    };
  };
}

function _getProductsFailure() {
  return (state, error) => ({
    ...state,
    loading: false,
    loaded: false,
    error,
  });
}

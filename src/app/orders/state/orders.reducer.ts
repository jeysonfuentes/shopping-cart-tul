import { map } from 'rxjs/operators';
import { createReducer, on } from '@ngrx/store';
import { defaultOrderState, OrderState } from './orders.model';
import * as ordersActions from './orders.actions';

export const ordersInitialState: OrderState = defaultOrderState;

const _ordersReducer = createReducer(
  ordersInitialState,
  on(ordersActions.GetOrders, _getOrders()),
  on(ordersActions.GetOrdersSuccess, _getOrdersSuccess()),
  on(ordersActions.GetOrdersFailure, _getOrdersFailure())
);

export function ordersReducer(state: OrderState, action: any) {
  return _ordersReducer(state, action);
}

function _getOrders() {
  return (state) => ({
    ...state,
    loading: true,
  });
}

function _getOrdersSuccess() {
  return (state, { orders }) => {
    return {
      ...state,
      orders,
      loading: false,
      loaded: true,
    };
  };
}

function _getOrdersFailure() {
  return (state, error) => ({
    ...state,
    loading: false,
    loaded: false,
    error,
  });
}

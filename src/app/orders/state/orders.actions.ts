import { createAction, props } from '@ngrx/store';
import { Order } from 'src/core/models/order.model';

export enum OrdersActionTypes {
  GetOrders = '[Orders] GetOrders',
  GetOrdersSuccess = '[Orders] GetOrdersSuccess',
  GetOrdersFailure = '[Orders] GetOrdersFailure',
}

export const GetOrders = createAction(
  OrdersActionTypes.GetOrders
);
export const GetOrdersSuccess = createAction(
  OrdersActionTypes.GetOrdersSuccess,
  props<{ orders: Order[] }>()
);
export const GetOrdersFailure = createAction(
  OrdersActionTypes.GetOrdersFailure,
  props<{ error: any }>()
);





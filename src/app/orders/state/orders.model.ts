import { AppState } from 'src/app/state/app.model';
import { Order } from 'src/core/models/order.model';

export interface AppStateOrder extends AppState {
  orders: OrderState;

}
export interface OrderState {
  orders: Order[];
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const defaultOrderState: OrderState = {
  orders: [],
  loading: false,
  loaded: false,
  error: null,
};

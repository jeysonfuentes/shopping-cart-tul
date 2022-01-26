import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Order } from 'src/core/models/order.model';
import * as AppStateOrderActions from '../orders/state';
import { AppStateOrder } from './state/orders.model';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  constructor(private store: Store<AppStateOrder>) {
    this.store.select('orders').subscribe(({ orders }) => {
      this.orders = orders || [];
    });
  }

  ngOnInit(): void {
    this.store.dispatch(AppStateOrderActions.GetOrders());
  }
}

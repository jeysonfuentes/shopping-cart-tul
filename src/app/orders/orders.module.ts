import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders.component';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { OrdersDetailComponent } from './orders-detail/orders-detail.component';

import { NzListModule } from 'ng-zorro-antd/list';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { OrdersEffectsArray, ordersReducer } from './state';
@NgModule({
  declarations: [
    OrdersComponent,
    OrdersDetailComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    NzIconModule,
    NzListModule,
    StoreModule.forFeature('orders', ordersReducer),
    EffectsModule.forFeature(OrdersEffectsArray),
  ]
})
export class OrdersModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingCartRoutingModule } from './shopping-cart-routing.module';
import { ShoppingCartComponent } from './shopping-cart.component';

import { NzListModule } from 'ng-zorro-antd/list';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ShoppingCartEffectsArray, shoppingCartReducer } from './state';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
@NgModule({
  declarations: [
    ShoppingCartComponent
  ],
  imports: [
    CommonModule,
    ShoppingCartRoutingModule,
    NzListModule,
    NzIconModule,
    StoreModule.forFeature('shoppingCart', shoppingCartReducer),
    EffectsModule.forFeature(ShoppingCartEffectsArray),
  ]
})
export class ShoppingCartModule { }

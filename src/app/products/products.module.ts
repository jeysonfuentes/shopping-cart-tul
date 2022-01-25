import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';

import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductEffectsArray, productReducer } from './state';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
@NgModule({
  declarations: [ProductsComponent, ProductCardComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    NzSkeletonModule,
    NzPaginationModule,
    StoreModule.forFeature('product', productReducer),
    EffectsModule.forFeature(ProductEffectsArray),
  ],
})
export class ProductsModule {}

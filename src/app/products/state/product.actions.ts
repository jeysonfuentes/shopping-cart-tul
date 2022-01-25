import { createAction, props } from '@ngrx/store';
import { Product } from 'src/core/models/product.model';

export enum ProductActionTypes {
  GetProducts = '[Product] GetProducts',
  GetProductsSuccess = '[Product] GetProductsSuccess',
  GetProductsFailure = '[Product] GetProductsFailure',
}

export const GetProducts = createAction(ProductActionTypes.GetProducts);
export const GetProductsSuccess = createAction(
  ProductActionTypes.GetProductsSuccess,
  props<{ products: Product[] }>()
);
export const GetProductsFailure = createAction(
  ProductActionTypes.GetProductsFailure,
  props<{ error: any }>()
);

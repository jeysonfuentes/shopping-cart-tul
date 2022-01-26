import { createAction, props } from '@ngrx/store';
import { Cart } from 'src/core/models/cart.model';
import { ProductCart } from 'src/core/models/product-cart.model';
import { Product } from 'src/core/models/product.model';

export enum ShoppingCartActionTypes {
  GetShoppingCart = '[ShoppingCart] GetShoppingCart',
  GetShoppingCartSuccess = '[ShoppingCart] GetShoppingCartSuccess',
  GetShoppingCartFailure = '[ShoppingCart] GetShoppingCartFailure',
  AddShoppingCart = '[ShoppingCart] AddShoppingCart',
  AddShoppingCartSuccess = '[ShoppingCart] AddShoppingCartSuccess',
  AddShoppingCartFailure = '[ShoppingCart] AddShoppingCartFailure',
  AddProductCartWhenNotExistShoppingCart = '[ShoppingCart] AddProductCartWhenNotExistShoppingCart',
  AddProductCartWhenNotExistShoppingCartSuccess = '[ShoppingCart] AddProductCartWhenNotExistShoppingCartSuccess',
  AddProductCartWhenNotExistShoppingCartFailure = '[ShoppingCart] AddProductCartWhenNotExistShoppingCartFailure',
  CompleteShoppingCart = '[ShoppingCart] CompleteShoppingCart',
  CompleteShoppingCartSuccess = '[ShoppingCart] CompleteShoppingCartSuccess',
  CompleteShoppingCartFailure = '[ShoppingCart] CompleteShoppingCartFailure',
  GetProductsCart = '[ShoppingCart] GetProductsCart',
  GetProductsCartSuccess = '[ShoppingCart] GetProductsCartSuccess',
  GetProductsCartFailure = '[ShoppingCart] GetProductsCartFailure',
  AddProductCart = '[ShoppingCart] AddProductCart',
  AddProductCartSuccess = '[ShoppingCart] AddProductCartSuccess',
  AddProductCartFailure = '[ShoppingCart] AddProductCartFailure',
  RemoveProductCart = '[ShoppingCart] RemoveProductCart',
  RemoveProductCartSuccess = '[ShoppingCart] RemoveProductCartSuccess',
  RemoveProductCartFailure = '[ShoppingCart] RemoveProductCartFailure',
  UpdateProductCart = '[ShoppingCart] UpdateProductCart',
  UpdateProductCartSuccess = '[ShoppingCart] UpdateProductCartSuccess',
  UpdateProductCartFailure = '[ShoppingCart] UpdateProductCartFailure',
}

export const GetShoppingCart = createAction(
  ShoppingCartActionTypes.GetShoppingCart
);
export const GetShoppingCartSuccess = createAction(
  ShoppingCartActionTypes.GetShoppingCartSuccess,
  props<{ cart: Cart }>()
);
export const GetShoppingCartFailure = createAction(
  ShoppingCartActionTypes.GetShoppingCartFailure,
  props<{ error: any }>()
);

export const AddShoppingCart = createAction(
  ShoppingCartActionTypes.AddShoppingCart
);
export const AddShoppingCartSuccess = createAction(
  ShoppingCartActionTypes.AddShoppingCartSuccess,
  props<{ cart: Cart }>()
);
export const AddShoppingCartFailure = createAction(
  ShoppingCartActionTypes.AddShoppingCartFailure,
  props<{ error: any }>()
);

export const AddProductCartWhenNotExistShoppingCart = createAction(
  ShoppingCartActionTypes.AddProductCartWhenNotExistShoppingCart,
  props<{product: Product}>()
);

export const AddProductCartWhenNotExistShoppingCartSuccess = createAction(
  ShoppingCartActionTypes.AddProductCartWhenNotExistShoppingCartSuccess,
  props<{ cart: Cart, productCart: ProductCart }>()
);
export const AddProductCartWhenNotExistShoppingCartFailure = createAction(
  ShoppingCartActionTypes.AddProductCartWhenNotExistShoppingCartFailure,
  props<{ error: any }>()
);

export const CompleteShoppingCart = createAction(
  ShoppingCartActionTypes.CompleteShoppingCart,
  props<{ cart: Cart }>()
);
export const CompleteShoppingCartSuccess = createAction(
  ShoppingCartActionTypes.CompleteShoppingCartSuccess
);
export const CompleteShoppingCartFailure = createAction(
  ShoppingCartActionTypes.CompleteShoppingCartFailure,
  props<{ error: any }>()
);

export const GetProductsCart = createAction(
  ShoppingCartActionTypes.GetProductsCart,
  props<{ cartId: string }>()
);
export const GetProductsCartSuccess = createAction(
  ShoppingCartActionTypes.GetProductsCartSuccess,
  props<{ productsCart: ProductCart[] }>()
);
export const GetProductsCartFailure = createAction(
  ShoppingCartActionTypes.GetProductsCartFailure,
  props<{ error: any }>()
);

export const AddProductCart = createAction(
  ShoppingCartActionTypes.AddProductCart,
  props<{ productCart: ProductCart }>()
);
export const AddProductCartSuccess = createAction(
  ShoppingCartActionTypes.AddProductCartSuccess,
  props<{ productCart: ProductCart }>()
);
export const AddProductCartFailure = createAction(
  ShoppingCartActionTypes.AddProductCartFailure,
  props<{ error: any }>()
);

export const RemoveProductCart = createAction(
  ShoppingCartActionTypes.RemoveProductCart,
  props<{ productCartId: string }>()
);
export const RemoveProductCartSuccess = createAction(
  ShoppingCartActionTypes.RemoveProductCartSuccess
);
export const RemoveProductCartFailure = createAction(
  ShoppingCartActionTypes.RemoveProductCartFailure,
  props<{ error: any }>()
);

export const UpdateProductCart = createAction(
  ShoppingCartActionTypes.UpdateProductCart,
  props<{ productCart: ProductCart }>()
);
export const UpdateProductCartSuccess = createAction(
  ShoppingCartActionTypes.UpdateProductCartSuccess
);
export const UpdateProductCartFailure = createAction(
  ShoppingCartActionTypes.UpdateProductCartFailure,
  props<{ error: any }>()
);

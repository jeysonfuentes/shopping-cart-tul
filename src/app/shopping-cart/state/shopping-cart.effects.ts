import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { Cart } from 'src/core/models/cart.model';
import { ProductCart } from 'src/core/models/product-cart.model';
import { CartsService } from 'src/core/services/carts/carts.service';
import { ProductsCartService } from 'src/core/services/products-cart/products-cart.service';
import * as shoppingCartActions from './shopping-cart.actions';
@Injectable()
export class ShoppingCartEffects {
  constructor(
    private actions$: Actions,
    private cartService: CartsService,
    private productsCartService: ProductsCartService
  ) {}

  getShoppingCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(shoppingCartActions.GetShoppingCart),
      mergeMap((action) =>
        this.cartService.getUserCart().pipe(
          map((result: Cart[]) =>
            !result.length
              ? shoppingCartActions.AddShoppingCart()
              : shoppingCartActions.GetShoppingCartSuccess({ cart: result[0] })
          ),
          catchError((err) =>
            of(shoppingCartActions.GetShoppingCartFailure({ error: err }))
          )
        )
      )
    )
  );

  addProductCartWhenNotExistShoppingCart = createEffect(() =>
    this.actions$.pipe(
      ofType(shoppingCartActions.AddProductCartWhenNotExistShoppingCart),
      mergeMap((action) =>
        this.cartService.addCart().pipe(
          switchMap((cart) => {
            const productCart: ProductCart = {
              cartId: cart.id,
              productId: action.product.id,
              productName: action.product.name,
              price: action.product.price,
              quantity: 1,
              total: action.product.price * 1,
            };
            return this.productsCartService.addProductCart(productCart).pipe(
              map((productCart) => ({
                productCart,
                cart,
              }))
            );
          }),
          map(({ productCart, cart }) =>
            shoppingCartActions.AddProductCartWhenNotExistShoppingCartSuccess({
              cart,
              productCart,
            })
          ),
          catchError((err) =>
            of(
              shoppingCartActions.AddProductCartWhenNotExistShoppingCartFailure(
                { error: err }
              )
            )
          )
        )
      )
    )
  );

  addShoppingCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(shoppingCartActions.AddShoppingCart),
      mergeMap((action) =>
        this.cartService.addCart().pipe(
          map((cart) => shoppingCartActions.AddShoppingCartSuccess({ cart })),
          catchError((err) =>
            of(shoppingCartActions.AddShoppingCartFailure({ error: err }))
          )
        )
      )
    )
  );

  completeShoppingCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(shoppingCartActions.CompleteShoppingCart),
      mergeMap((action) =>
        this.cartService.changeCartStatus('complete', action.cart).pipe(
          map(() => shoppingCartActions.CompleteShoppingCartSuccess()),
          catchError((err) =>
            of(shoppingCartActions.CompleteShoppingCartFailure({ error: err }))
          )
        )
      )
    )
  );

  onGetShoppingCartSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(shoppingCartActions.GetShoppingCartSuccess),
      map((action) =>
        shoppingCartActions.GetProductsCart({ cartId: action.cart.id })
      )
    )
  );

  getProductsCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(shoppingCartActions.GetProductsCart),
      mergeMap((action) =>
        this.productsCartService.getProductsCart(action.cartId).pipe(
          map((products) =>
            shoppingCartActions.GetProductsCartSuccess({
              productsCart: products,
            })
          ),
          catchError((err) =>
            of(shoppingCartActions.GetProductsCartFailure({ error: err }))
          )
        )
      )
    )
  );

  addProductCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(shoppingCartActions.AddProductCart),
      mergeMap((action) =>
        this.productsCartService.addProductCart(action.productCart).pipe(
          map((result) =>
            shoppingCartActions.AddProductCartSuccess({
              productCart: result,
            })
          ),
          catchError((err) =>
            of(shoppingCartActions.AddProductCartFailure({ error: err }))
          )
        )
      )
    )
  );

  removeProductCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(shoppingCartActions.RemoveProductCart),
      mergeMap((action) =>
        this.productsCartService.deleteProductCart(action.productCartId).pipe(
          map((id) => shoppingCartActions.RemoveProductCartSuccess()),
          catchError((err) =>
            of(shoppingCartActions.RemoveProductCartFailure({ error: err }))
          )
        )
      )
    )
  );

  updateProductCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(shoppingCartActions.UpdateProductCart),
      mergeMap((action) =>
        this.productsCartService.updateProductCart(action.productCart).pipe(
          map(() => shoppingCartActions.UpdateProductCartSuccess()),
          catchError((err) =>
            of(shoppingCartActions.UpdateProductCartFailure({ error: err }))
          )
        )
      )
    )
  );
}

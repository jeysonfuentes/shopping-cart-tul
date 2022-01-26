import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Cart } from 'src/core/models/cart.model';
import { CartsService } from 'src/core/services/carts/carts.service';
import * as ordersActions from './orders.actions';
@Injectable()
export class OrdersEffects {
  constructor(
    private actions$: Actions,
    private cartService: CartsService,
  ) {}

  getOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ordersActions.GetOrders),
      mergeMap((action) =>
        this.cartService.getUserCartComplete().pipe(
          map((result: Cart[]) => {
            const ORDERS = result.map((item) => {
              return {
                uid: item.userId,
                total: item.total,
              };
            });
            return ordersActions.GetOrdersSuccess({ orders: ORDERS });
          }),
          catchError((err) =>
            of(ordersActions.GetOrdersFailure({ error: err }))
          )
        )
      )
    )
  );
}

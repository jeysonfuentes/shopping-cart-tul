import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ProductsService } from 'src/core/services/products/products.service';
import * as productActions from './product.actions';
@Injectable()
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private productsService: ProductsService
  ) {}

  getProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productActions.GetProducts),
      mergeMap((action) =>
        this.productsService.getProducts().pipe(
          map((products) =>
            productActions.GetProductsSuccess({ products: products })
          ),
          catchError((err) =>
            of(productActions.GetProductsFailure({ error: err }))
          )
        )
      )
    )
  );
}

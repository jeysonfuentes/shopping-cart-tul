import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BaseComponent } from 'src/core/components/base.component';
import { Cart } from 'src/core/models/cart.model';
import { ProductCart } from 'src/core/models/product-cart.model';
import { AppState } from '../state/app.model';
import * as ShoppingCartActions from './state';
@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent extends BaseComponent implements OnInit  {
  cart: Cart = null;
  productsCart: ProductCart[] = [];
  totalCart = 0;
  constructor(private store: Store<AppState>) {
    super();
  }

  ngOnInit(): void {
    this.store.select('shoppingCart').subscribe(({ cart, productsCart }) => {
      this.cart = { ...cart };
      this.productsCart = [...productsCart];
      this.totalCart = this.productsCart.reduce((a, b) => a + b.total, 0);
    });
    this.getShoppingCart();
  }

  getShoppingCart() {
    this.store.dispatch(ShoppingCartActions.GetShoppingCart());
  }

  removeProductCart(productCartId: string) {
    this.store.dispatch(
      ShoppingCartActions.RemoveProductCart({ productCartId })
    );
  }

  incrementQuantity(productCart: ProductCart): void {
    const productCartModified = { ...productCart };
    productCartModified.quantity += 1;
    productCartModified.total =
      productCartModified.quantity * productCartModified.price;
    this.store.dispatch(
      ShoppingCartActions.UpdateProductCart({
        productCart: productCartModified,
      })
    );
  }

  decreaseQuantity(productCart: ProductCart): void {
    if (productCart.quantity === 1) {
      return this.removeProductCart(productCart.id);
    }
    const productCartModified = { ...productCart };
    productCartModified.quantity -= 1;
    productCartModified.total =
      productCartModified.quantity * productCartModified.price;
    this.store.dispatch(
      ShoppingCartActions.UpdateProductCart({
        productCart: productCartModified,
      })
    );
  }

  createOrder() {
    this.cart.total = this.totalCart;
    this.store.dispatch(
      ShoppingCartActions.CompleteShoppingCart({ cart: this.cart })
    );
  }

  hasProductsCart() {
    return this.productsCart.length;
  }
}

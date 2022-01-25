import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IMenuItem } from './app.interface';
import { AppStateShoppingCart } from './shopping-cart/state/shopping-cart.model';
import * as ShoppingCartActions from './shopping-cart/state';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'shopping-cart';

  mainMenu: Array<IMenuItem> = [
    {
      text: 'Products',
      url: 'products',
    },
    {
      text: 'Orders',
      url: 'orders',
    },
    {
      text: 'About',
      url: 'about',
    },
  ];
  constructor(private storeShoppingCart: Store<AppStateShoppingCart>) {}

  ngOnInit(): void {
    this.storeShoppingCart
      .select('shoppingCart')
      .subscribe((shoppingCartState) => {
        if (!shoppingCartState) {
          this.storeShoppingCart.dispatch(ShoppingCartActions.AddShoppingCart());
        }
      });
  }
}

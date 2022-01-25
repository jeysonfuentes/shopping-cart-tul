import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from 'src/core/models/product.model';
import { AppStateProduct, ProductState } from './state/product.model';
import * as ProductActions from './state';}
import * as ShoppingCartActions from '../shopping-cart/state/';
import { AppStateShoppingCart } from '../shopping-cart/state/shopping-cart.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  constructor(private storeProduct: Store<AppStateProduct>, private storeShopping: Store<AppStateShoppingCart>) {

  }

  ngOnInit(): void {
    this.storeProduct.select('product').subscribe((productsState) => {
      this.products = productsState?.products ?? [];
    });
    this.getProducts();
  }

  getProducts() {
    this.storeProduct.dispatch(ProductActions.GetProducts());
  }

  hasProducts() {
    return this.products?.length;
  }

  addToCart(productId, product: Product) {
    // this.storeShopping.dispatch(ShoppingCartActions.AddProductCart, productId);
  }
}

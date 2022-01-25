import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from 'src/core/models/product.model';
import { AppStateProduct, ProductState } from './state/product.model';
import * as ProductActions from './state';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  constructor(private store: Store<AppStateProduct>) {

  }

  ngOnInit(): void {
    this.store.select('product').subscribe((productsState) => {
      this.products = productsState?.products ?? [];
    });
    this.getProducts();
  }

  getProducts() {
    this.store.dispatch(ProductActions.GetProducts());
  }

  hasProducts() {
    return this.products?.length;
  }

  addToCart(event) {
    console.log(event)
  }
}

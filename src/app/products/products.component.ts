import { ProductCart } from 'src/core/models/product-cart.model';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from 'src/core/models/product.model';
import { AppStateProduct, ProductState } from './state/product.model';
import * as ProductActions from './state';
import * as ShoppingCartActions from '../shopping-cart/state/';
import { AppStateShoppingCart } from '../shopping-cart/state/shopping-cart.model';
import { User } from 'src/core/models/user.model';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Router } from '@angular/router';
import { Cart } from 'src/core/models/cart.model';
import { BaseComponent } from 'src/core/components/base.component';
import { Subscriber } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent extends BaseComponent implements OnInit {
  products: Product[] = [];
  currentUser: User = null;
  private cart: Cart = null;
  private productsCart: ProductCart[];
  constructor(
    private store: Store<AppStateProduct>,
    private modal: NzModalService,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.store.select('product').subscribe(({ products }) => {
      this.products = products;
    });
    this.store.select('auth').subscribe(({ currentUser }) => {
      if (currentUser) {
        this.currentUser = currentUser;
      } else {
        const localUser = JSON.parse(localStorage.getItem('currentUser'));
        if (localUser) {
          this.currentUser = localUser;
        }
      }
    });

    this.store.select('shoppingCart').subscribe(({ cart, productsCart }) => {
      this.cart = cart;
      this.productsCart = productsCart;
    });
    this.getProducts();
    if (this.currentUser) {
      this.store.dispatch(ShoppingCartActions.GetShoppingCart());
    }
  }

  getProducts(): void {
    this.store.dispatch(ProductActions.GetProducts());
  }

  hasProducts() {
    return this.products?.length;
  }

  addToCart(productId, product: Product) {
    if (!this.currentUser) {
      return this.showModalLogin();
    }

    if (!this.cart) {
      this.store.dispatch(
        ShoppingCartActions.AddProductCartWhenNotExistShoppingCart({
          product,
        })
      );
      return this.router.navigateByUrl('/shopping-cart');
    }

    let productCart: ProductCart = {
      productId,
      productName: product.name,
      price: product.price,
      quantity: 1,
      total: product.price * 1,
      cartId: this.cart.id,
    };

    if (this.productsCart) {
      const productExist = this.productsCart.find(
        (item) => item.productId === product.id
      );
      if (productExist) {
        productCart.quantity += 1;
        productCart.total = productCart.quantity * productCart.price;
        this.store.dispatch(
          ShoppingCartActions.UpdateProductCart({ productCart })
        );
      } else {
        this.store.dispatch(
          ShoppingCartActions.AddProductCart({ productCart })
        );
      }
    }
    this.router.navigateByUrl('/shopping-cart');
  }

  private showModalLogin(): void {
    const modal: NzModalRef = this.modal.create({
      nzTitle: 'Not logged in!',
      nzContent: 'you must be logged in to add to cart ',
      nzFooter: [
        {
          label: 'Close',
          shape: 'round',
          onClick: () => modal.destroy(),
        },
        {
          label: 'Sign In',
          type: 'primary',
          onClick: () => {
            this.router.navigateByUrl('auth/login');
            modal.destroy();
            // this.modal.confirm({ nzTitle: 'Confirm Modal Title', nzContent: 'Confirm Modal Content' })
          },
        },
      ],
    });
  }
}

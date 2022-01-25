import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ProductCart } from 'src/core/models/product-cart.model';
import { FirestoreService } from '../firebase/firestore.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsCartService extends FirestoreService<ProductCart> {
  constructor(public database: AngularFirestore) {
    super('products-cart', database);
  }

  getProductsCart(cartId: string): Observable<ProductCart[]> {
    return this.getByQuery({
      field: 'cartId',
      predicate: '==',
      value: cartId,
    }).pipe((result) => result);
  }

  addProductCart(productCart: ProductCart): Observable<ProductCart> {
    return this.create(productCart).pipe((result) => result);
  }

  deleteProductCart(id: string) {
    return this.delete(id).pipe((result) => result);
  }

  updateProductCart(productCart: ProductCart) {
    return this.update(productCart.id, productCart).pipe((result) => result);
  }
}

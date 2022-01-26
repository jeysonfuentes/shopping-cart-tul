import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Cart } from 'src/core/models/cart.model';
import { AuthService } from '../firebase/auth/auth.service';
import { FirestoreService } from '../firebase/firestore.service';

@Injectable({
  providedIn: 'root',
})
export class CartsService extends FirestoreService<Cart> {
  constructor(
    public database: AngularFirestore,
    private authService: AuthService
  ) {
    super('carts', database);
  }

  getUserCart() {
    const currentUser = this.authService.getCurrentUser();
    return this.getByQueryFields([
      {
        field: 'status',
        predicate: '==',
        value: 'pending',
      },
      {
        field: 'userId',
        predicate: '==',
        value: currentUser.uid,
      },
    ]);
  }

  getUserCartComplete() {
    const currentUser = this.authService.getCurrentUser();
    return this.getByQueryFields([
      {
        field: 'status',
        predicate: '==',
        value: 'complete',
      },
      {
        field: 'userId',
        predicate: '==',
        value: currentUser.uid,
      },
    ]);
  }

  addCart(): Observable<Cart> {
    const currentUser = this.authService.getCurrentUser();
    const userId = currentUser ? currentUser.uid : '';
    const cart: Cart = {
      status: 'pending',
      total: 0,
      userId,
    };
    return this.create(cart).pipe(tap(console.log));
  }

  updateCart(cart: Cart) {
    return this.update(cart.id, cart);
  }

  changeCartStatus(status: string, cart: Cart) {
    const modifiedCart = { ...cart };
    modifiedCart.status = status;
    return this.update(cart.id, modifiedCart);
  }
}

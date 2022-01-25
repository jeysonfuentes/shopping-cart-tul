import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
        field: 'userId',
        predicate: '==',
        value: currentUser.uid,
      },
      {
        field: 'status',
        predicate: '==',
        value: 'pending',
      },
    ]).pipe(map((response) => response));
  }

  getUserCartComplete() {
    const currentUser = this.authService.getCurrentUser();
    return this.getByQueryFields([
      {
        field: 'userId',
        predicate: '==',
        value: currentUser.id,
      },
      {
        field: 'status',
        predicate: '==',
        value: 'completed',
      },
    ]).pipe(map((result) => result));
  }

  addCart(): Observable<Cart> {
    const currentUser = this.authService.getCurrentUser();
    const userId = currentUser ? currentUser.uid : '';
    const cart: Cart = {
      status: 'pending',
      total: 0,
      userId,
    };
    return this.create(cart).pipe((result) => result);
  }

  updateCart(cart: Cart) {
    return this.update(cart.id, cart);
  }

  changeCartStatus(status: string, cart: Cart) {
    cart.status = status;
    return this.update(cart.id, cart);
  }
}

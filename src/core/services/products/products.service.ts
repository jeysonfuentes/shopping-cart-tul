import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from 'src/core/models/product.model';
import { FirestoreService } from '../firebase/firestore.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService extends FirestoreService<Product> {
  constructor(public database: AngularFirestore) {
    super('products', database);
  }

  getProducts(): Observable<Product[]> {
    return this.getList().pipe(map((result) => result));
  }
}

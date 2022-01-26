import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { IFirestoreService, QueryFields } from './firebase.interface';
import {
  AngularFirestore,
  CollectionReference,
  DocumentData,
} from '@angular/fire/firestore';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService<T> implements IFirestoreService<T> {
  collection: string;
  constructor(
    public collectionName: string,
    public database: AngularFirestore
  ) {
    if (!collectionName) {
      throw new Error('No se agrego un nombre de coleccion');
    }
    this.collection = collectionName;
  }

  create(item: T): Observable<any> {
    const itemToAdd = this.firebaseSerialize(item);
    itemToAdd.id = this.database.createId();
    console.log('itemToCreate', itemToAdd);
    const ref = this.database.doc<T>(`${this.collection}/${itemToAdd.id}`);
    return from(ref.set(itemToAdd)).pipe(map(() => itemToAdd));
  }
  update(id: string, item: T): Observable<void> {
    const itemToUpdate = this.database.doc<T>(`${this.collection}/${id}`);
    return from(itemToUpdate.update(item));
  }
  getById(id: string): any {
    return this.database
      .collection(`${this.collection}`)
      .doc(id)
      .valueChanges();
  }

  getByQuery(queryFields?: QueryFields): Observable<any[]> {
    return this.database
      .collection(`${this.collection}`, (ref) =>
        ref.where(queryFields.field, queryFields.predicate, queryFields.value)
      )
      .valueChanges();
  }

  getByQueryFields(queryFields: QueryFields[]) {
    return this.database
      .collection(`${this.collection}`, (ref) => {
        ref
          .where(
            queryFields[0].field,
            queryFields[0].predicate,
            queryFields[0].value
          )
          .where(
            queryFields[1].field,
            queryFields[1].predicate,
            queryFields[1].value
          );

        return ref;
      })
      .valueChanges();
  }

  delete(id: string): Observable<void> {
    return from(this.database.doc(`${this.collection}/${id}`).delete());
  }
  getList(): Observable<any> {
    return this.database.collection(`${this.collection}`).valueChanges();
  }

  private setQueryField(
    collectionReference: CollectionReference<DocumentData>,
    queryField: QueryFields
  ) {
    return collectionReference;
  }

  private firebaseSerialize<T>(object: T) {
    return JSON.parse(JSON.stringify(object));
  }
}

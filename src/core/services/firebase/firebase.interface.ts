import { Observable } from 'rxjs';

export interface IFirestoreService<T> {
  create(item: T): Observable<any>;
  update(id: string, item: T): Observable<void>;
  getById(id: string): T;
  delete(id: string): Observable<void>;
  getList(): any;
}

export interface QueryFields {
  field?: string;
  predicate?: any;
  value?: any;
}

export enum ActionFirestoreType {
  create,
  update,
  delete,
  get,
}

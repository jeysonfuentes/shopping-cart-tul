import { AppState } from 'src/app/state/app.model';
import { Product } from 'src/core/models/product.model';

export interface AppStateProduct extends AppState {
  product: ProductState;
}
export interface ProductState {
  paginate: any;
  products: Product[];
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const defaultProductState: ProductState = {
  paginate: null,
  products: [],
  loading: false,
  loaded: false,
  error: null,
};

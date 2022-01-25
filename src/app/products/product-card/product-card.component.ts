import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/core/models/product.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent{
  @Input() product: Product;
  @Output() addProduct = new EventEmitter<string>();

  addToCart(product) {
    this.addProduct.emit(product.id);
  }
}

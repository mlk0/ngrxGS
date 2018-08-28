import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';

import { Product } from '../../product';


@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  pageTitle = 'Products';

  @Input() products : Product[];
  @Input() errorMessage : string;
  @Input() displayCode : boolean;
  @Input() selectedProduct : Product;

  @Output() checked = new EventEmitter<boolean>();
  @Output() initializeNewProduct = new EventEmitter();
  @Output() selected = new EventEmitter<Product>();

  productSelected(product: Product) {
    console.log('ProductListComponent.productSelected')
     this.selected.emit(product);
  }

  newProduct() {
     this.initializeNewProduct.emit();
  }

  checkChanged(value: boolean): void {
     this.checked.emit(value);
  }

}

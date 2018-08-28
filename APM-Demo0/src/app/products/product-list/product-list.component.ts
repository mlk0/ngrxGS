import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription, Observable } from 'rxjs';

import { Product } from '../product';
import { ProductService } from '../product.service';
import { Store, select } from '@ngrx/store';
import * as fromProductState from "../state/products-state-reducer"
import * as fromProductActions from '../state/product-actions'
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Products';

  displayCode: boolean;

  products: Product[];

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;
  sub: Subscription;
  componenetActive: boolean;
  products$: Observable<Product[]>;
  errorMessage$: Observable<string>;

  constructor(
    private store: Store<fromProductState.AppState>,
    private productService: ProductService) { }

  ngOnInit(): void {
    this.componenetActive = true;
    
    this.errorMessage$ = this.store.pipe(select(fromProductState.errorMessageSelector));
    // this.store.pipe(select(fromProductActions.ProductActionTypes.LoadProductsFailure)).subscribe(
    //   error => console.log(`ProductListComponent - error : ${error}`)
    // );

    
    // this.sub = this.productService.selectedProductChanges$.subscribe(
    //   selectedProduct => this.selectedProduct = selectedProduct
    // );
    
    this.store.pipe(select(fromProductState.selectedProductSelector, takeWhile(()=>this.componenetActive))).subscribe(
    product => 
    {         
          console.log(`ProductListComponent - selectedProductSelector - set product : ${JSON.stringify(product)} `);
          this.selectedProduct = product;

      }
    );

    // this.productService.getProducts().subscribe(
    //   (products: Product[]) => this.products = products,
    //   (err: any) => this.errorMessage = err.error
    // );

    //explcit subsription with unsibscribe pattern
    // this.store.pipe(select(fromProductState.productsSelector), takeWhile(()=>this.componenetActive)).subscribe(
    //   products=>this.products = products
    // );

    //creation of an observable for the products without subscription
    this.products$ = this.store.pipe(select(fromProductState.productsSelector));

    this.store.dispatch(new fromProductActions.LoadProducts());

    this.store.pipe(select(fromProductState.showProductCodeSelector), takeWhile(()=>this.componenetActive==true)).subscribe(
      showProductCode => {
        console.log('ProductListComponent - products slice updated response from the observable subsription');        
          this.displayCode = showProductCode;         
      }
    );
  }

  ngOnDestroy(): void {
    //this.sub.unsubscribe();

    console.log(`ngOnDestroy - ProductListComponent`);
    this.componenetActive=false;
  }

  checkChanged(value: boolean): void {
    //this.displayCode = value;
    // this.store.dispatch(
    //   {
    //     type: 'TOGGLE_SHOW_PRODUCT_CODE',
    //     payload: value
    //   }
    // );

    this.store.dispatch(
      new fromProductActions.ToggleShowProductCode(value)
    );
  }

  newProduct(): void {
    //this.productService.changeSelectedProduct(this.productService.newProduct());
    this.store.dispatch(
      new fromProductActions.InitializeCurrentProduct()
    );
  }

  productSelected(product: Product): void {
    //this.productService.changeSelectedProduct(product);


    this.store.dispatch(
      //new fromProductActions.SetCurrentProductId(product.id)
      new fromProductActions.SetCurrentProduct(product)
    );
  }

}

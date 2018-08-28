import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Product } from '../../product';
import { Store, select } from '@ngrx/store';
import * as fromProductState from "../../state"
import * as fromProductActions from '../../state/product-actions'
import { Observable } from 'rxjs';

@Component({
    templateUrl: './product-shell.component.html'
    //,changeDetection : ChangeDetectionStrategy.OnPush
})
export class ProductShellComponent implements OnInit {

    products$: Observable<Product[]>;
    selectedProduct$: Observable<Product>;
    errorMessage$: Observable<string>;
    displayCode$: Observable<boolean>;

    constructor(
        private store: Store<fromProductState.AppState>) { }

    ngOnInit(): void {

        this.store.dispatch(new fromProductActions.LoadProducts());

        this.products$ = this.store.pipe(select(fromProductState.productsSelector));
        this.selectedProduct$ = this.store.pipe(select(fromProductState.selectedProductSelector));
        this.errorMessage$ = this.store.pipe(select(fromProductState.errorMessageSelector));
        this.displayCode$ = this.store.pipe(select(fromProductState.showProductCodeSelector));


    }


    checkChanged(value: boolean): void {
        this.store.dispatch(
            new fromProductActions.ToggleShowProductCode(value)
        );
    }

    newProduct(): void {

        this.store.dispatch(
            new fromProductActions.InitializeCurrentProduct()
        );
    }

    productSelected(product: Product): void {

console.log(`productSelected asssssssssssssssssssssssssssssssssssssssssssssssss`)

        this.store.dispatch(
            new fromProductActions.SetCurrentProduct(product)
        );
    }



    deleteProductById(productId : number){
      this.store.dispatch(new fromProductActions.DeleteProduct(productId));

    }
    saveOrUpdateProduct(product : Product){
        if (product.id === 0) {

          this.store.dispatch(new fromProductActions.AddProduct(product));

        } else {

          this.store.dispatch(new fromProductActions.UpdateProduct(product));

        }
    }

    clearCurrentProduct(){
        this.store.dispatch(
                new fromProductActions.ClearCurrentProduct()
            );
    }

}

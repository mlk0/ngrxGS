import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../../product';
import { Store, select } from '@ngrx/store';
import * as fromProductState from "../../state/products-state-reducer"
import * as fromProductActions from '../../state/product-actions'
import { Observable } from 'rxjs';

@Component({
    templateUrl: './product-shell.component.html'
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



        this.store.dispatch(
            new fromProductActions.SetCurrentProduct(product)
        );
    }
}

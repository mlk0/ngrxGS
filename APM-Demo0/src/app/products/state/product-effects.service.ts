import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ProductService } from '../product.service';
import * as fromProductActions from './product-actions';
import { mergeMap, map } from 'rxjs/operators';
import { productList } from './products-state-reducer';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';

@Injectable()
export class ProductEffects {
constructor(private actions$ : Actions, 
private productService : ProductService){}


@Effect()
loadProducts$ : Observable<Action> = this.actions$.pipe(
  ofType(fromProductActions.ProductActionTypes.LoadProducts),
  mergeMap(action => 
    this.productService.getProducts().pipe(
      map(productList => {
        return new fromProductActions.LoadProductsSuccess(productList);
      })
    )
  )
);

}

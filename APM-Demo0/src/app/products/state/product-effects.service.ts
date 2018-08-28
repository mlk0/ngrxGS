import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ProductService } from '../product.service';
import * as fromProductActions from './product-actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { productList } from './products-state-reducer';
import { Observable, of } from 'rxjs';
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
      }),
      catchError(err => {
        //catch error returns err : string but for the successfull propagation of the event that the error happened
        //it is more effective if a new observable is created out of the err and emitted to the subscribers
        return of(new fromProductActions.LoadProductsFailure(err));
          } 
        )
    )
  )
);

}

import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ProductService } from '../product.service';
import * as fromProductActions from './product-actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { productList } from './products-state-reducer';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { Product } from '../product';

@Injectable()
export class ProductEffects {
  constructor(private actions$: Actions,
    private productService: ProductService) { }


  @Effect()
  loadProducts$: Observable<Action> = this.actions$.pipe(
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


  @Effect()
  updateProduct$: Observable<Action> = this.actions$.pipe(
    ofType(fromProductActions.ProductActionTypes.UpdateProduct),
    mergeMap((action: fromProductActions.UpdateProduct) => this.productService.updateProduct(action.payload).pipe(
      map(updatedProduct => {
        return new fromProductActions.UpdateProductSuccess(updatedProduct);
      }),
      catchError(updateProductError => of(new fromProductActions.UpdateProductFailure(updateProductError)))
    )
    )
  );

  @Effect()
  addProduct$ = this.actions$.pipe(
    ofType(fromProductActions.ProductActionTypes.AddProduct),
    mergeMap((action: fromProductActions.AddProduct) => this.productService.createProduct(action.payload).pipe(
      map(newProduct => new fromProductActions.AddProductSuccess(newProduct)),
      catchError(err => of(new fromProductActions.AddProductFailure(err)))
    )
    )
  );


  @Effect()
  deleteProduct$ = this.actions$.pipe(
    ofType(fromProductActions.ProductActionTypes.DeleteProduct),
    mergeMap((action: fromProductActions.DeleteProduct) =>
      this.productService.deleteProduct(action.payload).pipe(
        map((z) => {
          console.log('delete product')
          return new fromProductActions.DeleteProductSuccess(action.payload)
        }),
        catchError(err => of(new fromProductActions.DeleteProductFailure(err)))
      )
    )
  );

}

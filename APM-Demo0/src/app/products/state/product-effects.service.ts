import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ProductService } from '../product.service';
import * as fromProductActions from './product-actions';
import { mergeMap, map } from 'rxjs/operators';

@Injectable()
export class ProductEffectsService {
constructor(private actions$ : Actions, 
private productService : ProductService){}

@Effect()
loadProducts$ = this.actions$.pipe(
  ofType(fromProductActions.ProductActionTypes.LoadProducts),
  mergeMap(
    action=>this.productService.getProducts().pipe(
      map(products=>(new fromProductActions.LoadProductsSuccess(products)))
    )
  )
);

}

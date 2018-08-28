import { Action } from "@ngrx/store";
import { Product } from "../product";
 

//enum of all action types for the product feature
export enum ProductActionTypes {
    ToggleShowProductCode = '[Product] Toggle Product Code',
    SetCurrentProduct = '[Product] Set Current Product',
    SetCurrentProductId = '[Product] Set Current Product Id',
    ClearCurrentProduct = '[Product] Clear Current Product',
    InitializeCurrentProduct = '[Product] Initialize Current Product',

    LoadProducts = '[Product] Load Products',
    LoadProductsSuccess = '[Products] Load Products Success',
    LoadProductsFailure = '[Products] Load Products Failure',

    UpdateProduct = '[Product] Update Product',
    UpdateProductSuccess = '[Product] Update Product Success',
    UpdateProductFailure = '[Product] Update Product Failure',

    AddProduct = '[Product] Add Product',
    AddProductSuccess = '[Product] Add Product Success',
    AddProductFailure = '[Product] Add Product Failure',

    DeleteProduct = '[Product] Delete Product',
    DeleteProductSuccess = '[Product] Delete Product Success',
    DeleteProductFailure = '[Product] Delete Product Failure',
    
    
}

//action creator
export class ToggleShowProductCode implements Action {
    readonly type: string = ProductActionTypes.ToggleShowProductCode;
    constructor(public payload: boolean) {
    }
    
    // public payload : boolean;
    // constructor(togleProductCodePayload : boolean){
        //     this.payload = togleProductCodePayload;
        // }
    }



export class SetCurrentProduct implements Action {
    readonly type: string = ProductActionTypes.SetCurrentProduct;
    constructor(public payload: Product) { }
}

export class SetCurrentProductId implements Action {
    readonly type: string = ProductActionTypes.SetCurrentProductId;
    constructor(public payload: number) {
    }

}


export class ClearCurrentProduct implements Action {
    readonly type: string = ProductActionTypes.ClearCurrentProduct;
    payload: any = null;
    //    constructor(){}
}

export class InitializeCurrentProduct implements Action {
    readonly type: string = ProductActionTypes.InitializeCurrentProduct;
    payload: any = null;
}


export class LoadProducts implements Action {
    readonly type: string = ProductActionTypes.LoadProducts
    constructor(public payload = null) { }
}


export class LoadProductsSuccess implements Action {
    readonly type: string = ProductActionTypes.LoadProductsSuccess
    constructor(public payload: Product[]) { }
}


export class LoadProductsFailure implements Action {
    readonly type: string = ProductActionTypes.LoadProductsFailure
    constructor(public payload: string) { }

}


export class UpdateProduct implements Action{
    readonly type: string = ProductActionTypes.UpdateProduct;
    constructor(public payload : Product){}
}

export class UpdateProductSuccess implements Action{
    readonly type: string = ProductActionTypes.UpdateProductSuccess
    constructor(public payload : Product){}
}

export class UpdateProductFailure implements Action {
    readonly type: string = ProductActionTypes.UpdateProductFailure;
    constructor(public payload : string){}
}



export class AddProduct implements Action{
    readonly type: string = ProductActionTypes.AddProduct;
    constructor(public payload : Product){}
}


export class AddProductSuccess implements Action{
    readonly type: string = ProductActionTypes.AddProductSuccess;
    constructor(public payload : Product){}
}


export class AddProductFailure implements Action{
    readonly type: string = ProductActionTypes.AddProductFailure;
    constructor(public payload : string){}
}



export class DeleteProduct implements Action{
    readonly type: string = ProductActionTypes.DeleteProduct;
    constructor(public payload : number){}
}


export class DeleteProductSuccess implements Action{
    readonly type: string = ProductActionTypes.DeleteProductSuccess;
    constructor(public payload : number){}
}


export class DeleteProductFailure implements Action{
    readonly type: string = ProductActionTypes.DeleteProductFailure;
    constructor(public payload : string){}
}


//union type
export type ProductActions =
    ToggleShowProductCode
    | SetCurrentProductId | SetCurrentProduct
    | ClearCurrentProduct
    | InitializeCurrentProduct
    | LoadProducts | LoadProductsSuccess | LoadProductsFailure
    | UpdateProduct | UpdateProductSuccess | UpdateProductFailure
    | AddProduct | AddProductSuccess | AddProductFailure
    | DeleteProduct | DeleteProductSuccess | DeleteProductFailure
    ;
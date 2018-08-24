import { Action } from "@ngrx/store";
import { Product } from "../product";

//enum of all action types for the product feature
export enum ProductActionTypes {
    ToggleShowProductCode = '[Product] Toggle Product Code',
    SetCurrentProduct = '[Product] Set Current Product',
    SetCurrentProductId = '[Product] Set Current Product Id',
    ClearCurrentProduct = '[Product] Clear Current Product',
    InitializeCurrentProduct = '[Product] Initialize Current Product'
}

//action creator
export class ToggleShowProductCode implements Action{
    readonly type: string = ProductActionTypes.ToggleShowProductCode;
    constructor(public payload : boolean){
    }

    // public payload : boolean;
    // constructor(togleProductCodePayload : boolean){
    //     this.payload = togleProductCodePayload;
    // }
}



export class SetCurrentProduct implements Action {
    readonly type : string = ProductActionTypes.SetCurrentProduct;
    constructor(public payload : Product){}
}

export class SetCurrentProductId implements Action{
    readonly type: string = ProductActionTypes.SetCurrentProductId;
    constructor(public payload : number){
    }

}

 
export class ClearCurrentProduct implements Action {
    readonly type: string = ProductActionTypes.ClearCurrentProduct;
    payload : any = null;
//    constructor(){}
}

export class InitializeCurrentProduct implements Action {
    readonly type : string = ProductActionTypes.InitializeCurrentProduct;
    payload : any = null;
}


//union type
export type ProductActions = 
ToggleShowProductCode 
    | SetCurrentProductId | SetCurrentProduct
    | ClearCurrentProduct
    | InitializeCurrentProduct;
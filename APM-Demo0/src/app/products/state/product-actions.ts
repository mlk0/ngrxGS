import { Action } from "@ngrx/store";

//enum of all action types for the product feature
export enum ProductActionTypes {
    ToggleShowProductCode = '[Product] Toggle Product Code'
}

//action creator
export class ToggleShowProductCode implements Action{
    readonly type: string = ProductActionTypes.ToggleShowProductCode;
    constructor(public payload : boolean){}

    // public payload : boolean;
    // constructor(togleProductCodePayload : boolean){
    //     this.payload = togleProductCodePayload;
    // }
}

//union type
export type ProductActions = ToggleShowProductCode;
import { Action } from "@ngrx/store";

//enum of all action types for the product feature
export enum ProductActionTypes {
    ToggleProductCode = '[Product] Toggle Product Code'
}

//action creator
export class ToggleProductCode implements Action{
    readonly type: string = ProductActionTypes.ToggleProductCode;
    constructor(public payload : boolean){}

    // public payload : boolean;
    // constructor(togleProductCodePayload : boolean){
    //     this.payload = togleProductCodePayload;
    // }
}

//union type
export type ProductActions = ToggleProductCode;
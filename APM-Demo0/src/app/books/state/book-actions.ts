import { Action } from "@ngrx/store";
import { Book } from "./book-state-reducer";
import { DeleteProduct } from "../../products/state/product-actions";

//the book action types enum
export enum BookActionTypes {
    LoadBooks = '[Books] LoadBooks',
    LoadBooksSuccess = '[Books] LoadBooks Success',
    LoadBooksFailure = '[Books] LoadBooks Failure',

    SetSelectedBook = '[Book] Set Selected Book' ,

    UpdateBook = '[Book] Update Book' ,
    DeleteBook = '[Book] Delete Book' ,
    AddNewBook = '[Book] Add New Book'

}

//action creators
export class LoadBooks implements Action{
    readonly type: string = BookActionTypes.LoadBooks
    constructor(public payload = null){}
}


export class LoadBooksSuccess implements Action{
    readonly type: string = BookActionTypes.LoadBooksSuccess
    constructor(public payload : Book[]){}
}

export class LoadBooksFailure implements Action{
    readonly type: string = BookActionTypes.LoadBooksFailure
    constructor(public payload : string){}
}

export class SetSelectedBook implements Action{
    readonly type: string = BookActionTypes.SetSelectedBook
    constructor(public payload : number){}
}



export class UpdateBook implements Action{
    readonly type: string = BookActionTypes.UpdateBook
    constructor(public payload : Book[]){}
}

export class DeleteBook implements Action{
    readonly type: string = BookActionTypes.DeleteBook
    constructor(public payload : number){}
}

export class AddNewBook implements Action{
    readonly type: string = BookActionTypes.AddNewBook
    constructor(public payload : Book[]){}
}


//the union type
export type BookActions = LoadBooks | LoadBooksSuccess | LoadBooksSuccess
                            | SetSelectedBook
                            | UpdateBook | DeleteBook
import { BookState } from "./book-state-reducer";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromRoot from '../../state/app-state';


//to be moved to index.ts
export interface AppState extends fromRoot.AppState {
    books: BookState
}

const bookFeatureSliceSelector = createFeatureSelector<BookState>('books');

//returns Book[]
export const booksSelector = createSelector(
    bookFeatureSliceSelector,
    bookSlice => bookSlice.books;
)

//returns number
export const currentBookIdSelector = createSelector(
    bookFeatureSliceSelector,
    booksSlice => booksSlice.currentBookId
)

//returns Book
export const currentBookSelector = createSelector(
    bookFeatureSliceSelector,
    currentBookIdSelector,
    (booksFeatureSlice : BookState, currentBookId : number ) => {
        var selectedBook = booksFeatureSlice.books.find(b=>b.id===currentBookId);
        return selectedBook;
    }
)

//returns string
export const errorMessageSelector = createSelector(
    bookFeatureSliceSelector,
    bookSlice => bookSlice.errorMessage;
)

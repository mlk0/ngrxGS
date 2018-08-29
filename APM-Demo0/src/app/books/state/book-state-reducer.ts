import * as fromBookActions from './book-actions';

export interface Book {
    id: number;
    title: string;
}

export interface BookState {
    books: Book[],
    currentBookId: number
    errorMessage: string
}

export function BookStateReducer(state: BookState, action: fromBookActions.BookActions) {
    switch (action.type) {

        case fromBookActions.BookActionTypes.SetSelectedBook:
            {
                return {
                    ...state,
                    currentBookId: (action.payload as number)
                }
            }

        case fromBookActions.BookActionTypes.LoadBooksSuccess: {

            return {
                ...state,
                books: (action.payload as Book[]),
                errorMessage: ''
            }
        }

        case fromBookActions.BookActionTypes.LoadBooksFailure: {

            return {
                ...state,
                books: [],
                errorMessage: (action.payload as string)
            }
        }


        case fromBookActions.BookActionTypes.UpdateBook: {

            let updatedBook = action.payload as Book;

            let updatedBookList: Book[] =
                state.books.map(b => b.id === updatedBook.id ? updatedBook : b);


            return {
                ...state,
                books: updatedBookList,
                errorMessage: ''
            }
        }

        case fromBookActions.BookActionTypes.DeleteBook: {

            let deletedBookId = action.payload as number;

            let updatedBookList: Book[] =
                state.books.filter(b => b.id != deletedBookId);


            return {
                ...state,
                books: updatedBookList,
                errorMessage: ''
            }
        }


        case fromBookActions.BookActionTypes.AddNewBook: {

            let newBook = action.payload as Book;

            let updatedBookList: Book[] =
                state.books.concat(newBook);


            return {
                ...state,
                books: updatedBookList,
                errorMessage: ''
            }
        }

        default:
            return state;
    }
}


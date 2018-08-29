import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksComponent } from './books.component';
import { StoreModule } from '@ngrx/store';
import { BookStateReducer } from './state/book-state-reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('books', BookStateReducer)
  ],
  declarations: [BooksComponent]
})
export class BooksModule { }

import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, of, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Book } from './myComponents/books/book';
import { List } from './myComponents/lists/list';

@Injectable({
  providedIn: 'root'
})
export class CRUDService {

  constructor(private http: HttpClient) { }

  //signals
  lists = signal<List[]>([]);
  books = signal<Book[]>([]);

  private getBooks = this.http.get<Book[]>("http://localhost:3000/books").pipe(
    tap(data => this.books.set(data)),
    takeUntilDestroyed(),
    catchError(() => of([] as Book[]))
  ).subscribe();

  private getLists = this.http.get<List[]>("http://localhost:3000/lists").pipe(
    tap(data => this.lists.set(data)),
    takeUntilDestroyed(),
    catchError(() => of([] as List[]))
  ).subscribe();


  addList(payload: List) {
    return this.http.post("http://localhost:3000/lists", payload).pipe(
      catchError(err => {
        console.log(err);
        return []
      })
    )
  }

  DeleteList(id: number) {
    return this.http.delete(`http://localhost:3000/lists/${id}`).pipe(
      catchError(err => {
        console.log(err);
        return []
      })
    );
  }

  GetListBook() {
    return this.http.get<Book[]>("http://localhost:3000/lists/1").pipe(
      catchError(err => {
        console.log(err);
        return []
      })
    );
  }

  updateListBook(payload: List) {
    return this.http.put(`http://localhost:3000/lists/${payload.id}`, payload).pipe(
      catchError(err => {
        console.log(err);
        return []
      })
    )
  }

  updateBook(payload: Book) {
    return this.http.put(`http://localhost:3000/books/${payload.id}`, payload).pipe(
      catchError(err => {
        console.log(err);
        return []
      })
    )
  }

}




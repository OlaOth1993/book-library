import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

import { Book } from './myComponents/books/book';
import { List } from './myComponents/lists/list';

@Injectable({
  providedIn: 'root'
})
export class CRUDService {

  constructor(private http: HttpClient) { }

  private books$ = this.http.get<Book[]>("http://localhost:3000/books").pipe(
    catchError(err => {
      console.log(err);
      return []
    })
  )

  private lists$ = this.http.get<List[]>("http://localhost:3000/lists").pipe(
    catchError(err => {
      console.log(err);
      return []
    })
  )

  //Expose signals from the service
  books = toSignal<Book[], Book[]>(this.books$, { initialValue: [] });
  lists = toSignal<List[], List[]>(this.lists$, { initialValue: [] });


  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>("http://localhost:3000/books").pipe(
      catchError(err => {
        console.log(err);
        return []
      })
    )
  }

  getLists(): Observable<List[]> {
    return this.http.get<List[]>("http://localhost:3000/lists").pipe(
      catchError(err => {
        console.log(err);
        return []
      })
    )
  }

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
    return this.http.put(`http://localhost:3000/lists/${payload.id}`, payload).pipe(
      catchError(err => {
        console.log(err);
        return []
      })
    )
  }

}




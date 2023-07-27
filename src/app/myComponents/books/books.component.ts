import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common'
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { AddListBookComponent } from './add-list-book/add-list-book.component';
import { DeleteComponent } from './delete/delete.component';
import { BookcardComponent } from './bookcard/bookcard.component';
import { AddBookComponent } from './add-book/add-book.component';
import { CRUDService } from 'src/app/crud.service';
import { Book } from './book';
import { Subscription } from 'rxjs';
import { List } from '../lists/list';

@Component({
  standalone: true,
  selector: 'app-books',
  imports: [MatToolbarModule, MatCardModule, CommonModule, MatButtonModule, MatIconModule, MatDialogModule, BookcardComponent],
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnDestroy {
  sub: Subscription[] = []

  constructor(private CRUDservice: CRUDService,
    public dialog: MatDialog) { }

  //component signals
  books = this.CRUDservice.books;
  lists = this.CRUDservice.lists;


  openAddBookDialog() {
    const dialogRef = this.dialog.open(AddBookComponent, {
      width: '500px',
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        //use signals update data
        this.books.mutate((value) => {
          value.push(result);
        })
      }
    });
  }


  //open dialog to choose list to add the book
  openAddDialog(book: Book) {
    const dialogRef = this.dialog.open(AddListBookComponent, {
      width: '300px',
      data: { book: book },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        book.onList = true;
        this.updateBookStatus(book);
        //use signals update data
      }
    });
  }

  openDeleteDialog(id: number) {
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: '300px',
      data: { id: id },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.books.mutate(value => {
          const index = value.map(x => {
            return x.id;
          }).indexOf(id);

          value.splice(index, 1);
        })
        //use signals update data

        this.deleteBookList(id);
      }
    });
  }

  //delete the book from a list if it is already in one
  deleteBookList(id: number) {
    const list = this.lists().find((list) => {
      const book = list.books.find(book => book.id == id);
      if (book)
        return list
      return null
    })
    let bookIndex = list?.books.findIndex(book => book.id == id)
    let listIndex = this.lists().findIndex(x => x.id == list?.id)

    this.lists()[listIndex].books.splice(bookIndex ? bookIndex : -1, 1);
    this.updateListBook(this.lists()[listIndex]);

  }

  updateListBook(list: List) {
    let sub2 = this.CRUDservice.updateListBook(list).subscribe();
    this.sub.push(sub2);
  }
  //ubdate the book status of being under list
  updateBookStatus(book: Book) {
    let sub1 = this.CRUDservice.updateBook(book).subscribe();
    this.sub.push(sub1);
  }

  ngOnDestroy() {
    if (this.sub.length > 0) {
      this.sub.forEach((sub) => {
        sub.unsubscribe();
      })
    }
  }
}


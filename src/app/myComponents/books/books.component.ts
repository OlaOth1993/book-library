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

@Component({
  standalone: true,
  selector: 'app-books',
  imports: [MatToolbarModule, MatCardModule, CommonModule, MatButtonModule, MatIconModule, MatDialogModule, BookcardComponent],
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnDestroy {
  sub: Subscription | undefined

  constructor(private CRUDservice: CRUDService,
    public dialog: MatDialog) { }

  //component signals
  books = this.CRUDservice.books;


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
      }
    });
  }

  //ubdate the book status of being under list
  updateBookStatus(book: Book) {
    this.sub = this.CRUDservice.updateBook(book).subscribe();
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}


import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { AddListBookComponent } from './add-list-book/add-list-book.component';
import { BookcardComponent } from './bookcard/bookcard.component';
import { CRUDService } from 'src/app/crud.service';
import { Book } from './book';

@Component({
  standalone: true,
  selector: 'app-books',
  imports: [MatToolbarModule, MatCardModule, CommonModule, MatButtonModule, MatIconModule, MatDialogModule, BookcardComponent],
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent {
  allBooks: Book[] = [];

  constructor(private CRUDservice: CRUDService,
    public dialog: MatDialog) { }

  //component signals
  books = this.CRUDservice.books;


  /* getMyBooks() {
     this.CRUDservice.getBooks()
       .subscribe((data) => {
         this.allBooks = data;
       })
   } */


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

  //ubdate the book status of being under list
  updateBookStatus(book: Book) {
    this.CRUDservice.updateBook(book).subscribe(() => {
      //this.books.mutate()
      //this.getMyBooks();
    })
  }
}


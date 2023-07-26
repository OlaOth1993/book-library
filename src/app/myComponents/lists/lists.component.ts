import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { AddListComponent } from './add-list/add-list.component';
import { DeleteListComponent } from './delete-list/delete-list.component';
import { DeleteBookComponent } from '../books/delete-book/delete-book.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { CRUDService } from 'src/app/crud.service';
import { List } from './list';
import { Book } from '../books/book';

@Component({
  selector: 'app-lists',
  standalone: true,
  imports: [MatToolbarModule, MatCardModule, CommonModule, MatButtonModule, MatIconModule, MatDialogModule, MatDividerModule, DragDropModule],
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent {

  //component signals
  lists = this.CRUDservice.lists;

  constructor(private CRUDservice: CRUDService,
    public dialog: MatDialog,
    private router: Router) { }


  //Add list in dialog 
  openDialog(): void {
    const dialogRef = this.dialog.open(AddListComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {

        //use signals update data
        this.lists.mutate(value => { value.push(result) })

      }
    });
  }


  //Delete list in dialog
  openDeleteDialog(id: number) {
    const dialogRef = this.dialog.open(DeleteListComponent, {
      width: '300px',
      data: { id: id },
    });

    dialogRef.afterClosed().subscribe(() => {

      //use signals update data
      this.lists.mutate(value => {
        const index = value.map(x => {
          return x.id;
        }).indexOf(id);

        value.splice(index, 1);
      })

    });
  }

  //Remove a book from a list 
  removeBook(listId: number, listIndex: number, bookIndex: number) {
    //delete the choosen book from its list by splice
    //and send the updated list to dialog component where the update api call 
    const listsCopy = JSON.parse(JSON.stringify(this.lists()));
    const deletedBook = listsCopy[listIndex].books.splice(bookIndex, 1)[0];
    const dialogRef = this.dialog.open(DeleteBookComponent, {
      width: '300px',
      data: { listId: listId, updatedList: listsCopy[listIndex] },
    });

    dialogRef.afterClosed().subscribe(() => {

      this.lists.mutate((value => {
        value[listIndex].books.splice(bookIndex, 1);
      }))

      console.log(this.lists())
      deletedBook.onList = false;
      this.updateBookStatus(deletedBook);

    });
  }

  //update the book status of being out the list
  updateBookStatus(book: Book) {
    console.log('book', book)
    this.CRUDservice.updateBook(book).subscribe();
  }

  //get the sorted array after drag and drop 
  drop(event: CdkDragDrop<string[]>, sortedArray: List) {
    moveItemInArray(sortedArray.books, event.previousIndex, event.currentIndex);
    this.updateBookList(sortedArray);
  }

  //update the api after sorting
  updateBookList(bookList: List) {
    this.CRUDservice.updateListBook(bookList).subscribe()
  }

  goToBooks() {
    this.router.navigate(['/']);
  }
}

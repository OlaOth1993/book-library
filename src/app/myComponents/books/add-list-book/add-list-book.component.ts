import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CRUDService } from 'src/app/crud.service';
import { List } from '../../lists/list';

@Component({
  selector: 'app-add-list-book',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatDialogModule, MatButtonModule, MatInputModule, MatSelectModule],
  templateUrl: './add-list-book.component.html',
  styleUrls: ['./add-list-book.component.scss']
})
export class AddListBookComponent {
  selectedList = -1;
  lists: List[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddListBookComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private CRUDservice: CRUDService,) {
    this.getLists();
  }

  getLists() {
    this.CRUDservice.getLists().subscribe((data) => {
      this.lists = data;
    })
  }

  //push the added book to the list and send it to the api
  add() {
    const selectedList = this.lists.filter((list) => list.id == this.selectedList)[0];
    if (selectedList.books) {
      selectedList.books.push(this.data.book)
    }
    else {
      selectedList.books = [this.data.book]
    }
    this.CRUDservice.updateListBook(selectedList).subscribe((data) => {
      this.dialogRef.close(data);
    })

  }

}

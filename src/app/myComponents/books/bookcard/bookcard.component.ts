import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common'
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Book } from '../book';

@Component({
  selector: 'app-bookcard',
  standalone: true,
  imports: [MatToolbarModule, MatCardModule, CommonModule, MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './bookcard.component.html',
  styleUrls: ['./bookcard.component.scss']
})
export class BookcardComponent {

  @Output() addToListClick = new EventEmitter<any>();
  @Input() isAddToList = false;
  @Input() book: Book = {
    id: 0,
    onList: false,
    title: '',
    author: '',
    image: '',
    year: ''
  };

  addToList(book: Book) {
    this.addToListClick.emit(book);
  }

}

import { Component, Inject, OnDestroy } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NumberDirective } from 'src/app/directives/only-numbers.directive';
import { CRUDService } from 'src/app/crud.service';
import { Book } from '../book';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatDialogModule, MatButtonModule, MatInputModule, NumberDirective],
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnDestroy {

  bookForm: FormGroup;
  sub: Subscription | undefined;

  constructor(
    public dialogRef: MatDialogRef<AddBookComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private CRUDservice: CRUDService,) {
    this.bookForm = this.fb.group({
      title: [''],
      author: [''],
      image: [''],
      year: [''],
      onList: false
    });
  }


  create() {
    if (this.bookForm.valid) {
      this.sub = this.CRUDservice.addBook(this.bookForm.value as Book).subscribe((data) => {
        this.dialogRef.close(data);
      })
    }
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

}

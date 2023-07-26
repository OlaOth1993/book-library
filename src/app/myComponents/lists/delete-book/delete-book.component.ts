import { Component, Inject, OnDestroy } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CRUDService } from 'src/app/crud.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-delete-book',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatDialogModule, MatButtonModule],
  templateUrl: './delete-book.component.html',
  styleUrls: ['./delete-book.component.scss']
})
export class DeleteBookComponent implements OnDestroy {
  sub: Subscription | undefined

  constructor(
    public dialogRef: MatDialogRef<DeleteBookComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private CRUDservice: CRUDService) { }

  remove() {
    this.sub = this.CRUDservice.updateListBook(this.data.updatedList)
      .subscribe(() => {
        console.log('remove')
        this.dialogRef.close();
      })

  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

}

import { Component, Inject, OnDestroy } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CRUDService } from 'src/app/crud.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-delete',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatDialogModule, MatButtonModule],
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnDestroy {
  private sub: Subscription | undefined;

  constructor(
    public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private CRUDservice: CRUDService) { }

  delete() {
    this.sub = this.CRUDservice.DeleteBook(this.data.id)
      .subscribe(() => {
        console.log('delete book')
        this.dialogRef.close(this.data.id);
      })
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

}

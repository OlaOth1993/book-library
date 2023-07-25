import { Component, Inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CRUDService } from 'src/app/crud.service';

@Component({
  selector: 'app-delete-list',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatDialogModule, MatButtonModule],
  templateUrl: './delete-list.component.html',
  styleUrls: ['./delete-list.component.scss']
})
export class DeleteListComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private CRUDservice: CRUDService) { }

  delete() {
    this.CRUDservice.DeleteList(this.data.id).subscribe(() => {
      this.dialogRef.close(this.data.id);
    })
  }

}

import { Component, Inject, OnDestroy } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CRUDService } from 'src/app/crud.service';
import { List } from '../list';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-add-list',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatDialogModule, MatButtonModule, MatInputModule],
  templateUrl: './add-list.component.html',
  styleUrls: ['./add-list.component.scss']
})
export class AddListComponent implements OnDestroy {
  title = '';
  listForm: FormGroup;
  sub: Subscription | undefined

  constructor(
    public dialogRef: MatDialogRef<AddListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private CRUDservice: CRUDService,) {
    this.listForm = this.fb.group({
      title: ['']
    });
  }

  create() {
    if (this.listForm.valid) {
      this.CRUDservice.addList(this.listForm.value as List).subscribe((data) => {
        this.dialogRef.close(data);
      })
    }
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

}

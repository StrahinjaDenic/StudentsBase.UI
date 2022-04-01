import { MatSnackBar } from '@angular/material/snack-bar';
import { ValidationResponse } from './../models/validation-response';
import { first } from 'rxjs/operators';
import { ExaminationDateService } from './../../services/examinationDate.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit, Optional } from '@angular/core';

@Component({
  selector: 'app-examination-date-create-or-edit',
  templateUrl: './examination-date-create-or-edit.component.html',
  styleUrls: ['./examination-date-create-or-edit.component.scss']
})
export class ExaminationDateCreateOrEditComponent implements OnInit {

  exDateForm: FormGroup;

  constructor(
    private examinationDateService: ExaminationDateService,
    private fb: FormBuilder,
    private matSnack: MatSnackBar,
    @Optional() public dialogRef: MatDialogRef<ExaminationDateCreateOrEditComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: {id: number}) {
      this.exDateForm = this.fb.group({
        "id": 0,
        "year": [null, Validators.required],
        "mark": [null, Validators.required],
        "name": [null, Validators.required]
      })
     }

  async ngOnInit() {
    if (this.data?.id)
    {
      this.examinationDateService.getEaminationDate(this.data.id).pipe(first()).subscribe(examinationDate => {
        this.exDateForm.patchValue(examinationDate);
      })
    }
  }

  cancel() {
    this.dialogRef.close();
  }

  submit() {
    if(this.exDateForm.valid) {
      this.examinationDateService.updateCreateExaminationDate(this.exDateForm.value).pipe(first())
      .subscribe((x: ValidationResponse) => {
        if (x.isSuccess) {
          this.matSnack.open(x.message, undefined, { duration: 4000, panelClass: ['successSnack'] });
          this.dialogRef.close(true);
        }
        else {
          this.matSnack.open(x.message ?? "Error occured", undefined, { duration: 4000, panelClass: ['errorSnack'] });
      }
      })
    }
  }

}

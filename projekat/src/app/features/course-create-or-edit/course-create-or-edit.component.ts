import { ValidationResponse } from './../models/validation-response';
import { CourseService } from 'src/app/services/course.service';
import { first } from 'rxjs/operators';
import { ProfessorService } from 'src/app/services/professor.service';
import { Professor } from './../models/professor';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-course-create-or-edit',
  templateUrl: './course-create-or-edit.component.html',
  styleUrls: ['./course-create-or-edit.component.scss']
})
export class CourseCreateOrEditComponent implements OnInit {

  professors: Professor[] = [];

  coruseForm: FormGroup;

  constructor(
    private courseService: CourseService,
    private professorService: ProfessorService,
    private fb: FormBuilder,
    private matSnack: MatSnackBar,
    @Optional() public dialogRef: MatDialogRef<CourseCreateOrEditComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: { id: number }) {
      this.coruseForm = this.fb.group({
        "id": 0,
        "code": [null, Validators.required],
        "name": [null, Validators.required],
        "points": [null, Validators.required],
        "professorIds": [null, Validators.required]
      })
     }

  async ngOnInit() {
    this.professorService.getallProfessors().pipe(first()).subscribe(result => {
      if (result) {
        this.professors = result;
      }
    });

    if (this.data?.id) {
      this.courseService.getCourse(this.data.id).pipe(first()).subscribe(course => {
        this.coruseForm.patchValue(course);
      })
    }
  }

  cancel() {
    this.dialogRef.close();
  }

  submit() {
    if (this.coruseForm.valid) {
      this.courseService.updateCreateCourse(this.coruseForm.value).pipe(first())
      .subscribe((x: ValidationResponse) => {
        if (x.isSuccess) {
          this.matSnack.open(x.message, undefined, {duration: 4000, panelClass: ['successSnack'] });
          this.dialogRef.close(true);
          //this.search(null);
        }
        else {
          this.matSnack.open(x.message ?? "Error occured", undefined, { duration: 4000, panelClass: ['errorSnack'] });
        }
      })
    }
  }
}

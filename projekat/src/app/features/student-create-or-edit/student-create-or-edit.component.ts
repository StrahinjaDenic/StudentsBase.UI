import { ProfessorCourses } from './../models/professorCourses';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ValidationResponse } from './../models/validation-response';
import { CourseService } from './../../services/course.service';
import { Course } from './../models/course';
import { Student } from './../models/student';
import { first } from 'rxjs/operators';
import { StudentService } from './../../services/student.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit, Optional } from '@angular/core';

@Component({
  selector: 'app-student-create-or-edit',
  templateUrl: './student-create-or-edit.component.html',
  styleUrls: ['./student-create-or-edit.component.scss']
})
export class StudentCreateOrEditComponent implements OnInit {

  professorCourses: ProfessorCourses[] = [];

  studentForm: FormGroup;

  constructor(
    private studentService: StudentService,
    private fb: FormBuilder,
    private matSnack: MatSnackBar,
    @Optional() public dialogRef: MatDialogRef<StudentCreateOrEditComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: {id: number}) {
      this.studentForm = this.fb.group({
        "id": 0,
        "index": [null, Validators.required],
        "name": [null, Validators.required],
        "surname": [null, Validators.required],
        "dateOfEntry": [null, Validators.required],
        "dateOfBirth": null,
        "placeOfBirth": null,
        "coAndPrIds": [null, Validators.required]
      })
    }

  async ngOnInit() {
    this.studentService.getProfessorCourses().pipe(first()).subscribe(result => {
      if (result) {
        this.professorCourses = result;
      }
    });

    if (this.data?.id) {
      this.studentService.getStudent(this.data.id).pipe(first()).subscribe(student => {
        this.studentForm.patchValue(student);
      })
    }
  }

  cancel() {
    this.dialogRef.close();
  }

  submit() {
    if (this.studentForm.valid) {
      this.studentService.updateCreateStudent(this.studentForm.value).pipe(first())
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

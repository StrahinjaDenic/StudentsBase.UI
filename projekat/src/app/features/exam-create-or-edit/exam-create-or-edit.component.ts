import { ExaminationDateService } from './../../services/examinationDate.service';
import { StudentService } from './../../services/student.service';
import { CourseService } from 'src/app/services/course.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ValidationResponse } from './../models/validation-response';
import { first } from 'rxjs/operators';
import { ExamService } from './../../services/exam.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit, Optional } from '@angular/core';
import { Course, Exam, Student, ExaminationDate } from '../models';

@Component({
  selector: 'app-exam-create-or-edit',
  templateUrl: './exam-create-or-edit.component.html',
  styleUrls: ['./exam-create-or-edit.component.scss']
})
export class ExamCreateOrEditComponent implements OnInit {

  students: Student[] = [];
  courses: Course[] = [];
  examinationDates: ExaminationDate[] = [];

  examForm: FormGroup;

  constructor(
    private examService: ExamService,
    private courseService: CourseService,
    private studentService: StudentService,
    private examinationDateService: ExaminationDateService,
    private fb: FormBuilder,
    private matSnack: MatSnackBar,
    @Optional() public dialogRef: MatDialogRef<ExamCreateOrEditComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: {id: number}) {
      this.examForm = this.fb.group({
        "id": 0,
        "studentId": [null, Validators.required],
        "courseId": [null, Validators.required],
        "examinationDateId": [null, Validators.required],
        //"mark": [null, Validators.required],
        "grade": [null, Validators.required],
        "examDate": [null, Validators.required],
        "points": [null, Validators.required]
      })
   }

  ngOnInit(): void {
    this.studentService.getallStudents().pipe(first()).subscribe(results => {
      if (results) {
        this.students = results;
      }
    })

    this.courseService.getAllCourses().pipe(first()).subscribe(results => {
      if (results) {
        this.courses = results;
      }
    })

    this.examinationDateService.getAllExaminationDate().pipe(first()).subscribe(results => {
      if(results) {
        this.examinationDates = results;
      }
    })

    if (this.data?.id) {
      this.examService.getExam(this.data.id).pipe(first()).subscribe(exam => {
        this.examForm.patchValue(exam);
      });
    }
  }

  cancel() {
    this.dialogRef.close();
  }

  submit() {
    if (this.examForm.valid) {
      this.examService.updateCreateExam(this.examForm.value).pipe(first())
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

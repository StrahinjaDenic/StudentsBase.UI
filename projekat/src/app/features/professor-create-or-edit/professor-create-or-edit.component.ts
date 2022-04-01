import { ProfessorService } from 'src/app/services/professor.service';
import { CourseService } from 'src/app/services/course.service';
import { Component, Input, OnInit, Output, EventEmitter, Optional, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Course, Professor, ValidationResponse } from '../models';
import { first } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-professor-create-or-edit',
  templateUrl: './professor-create-or-edit.component.html',
  styleUrls: ['./professor-create-or-edit.component.scss']
})
export class ProfessorCreateOrEditComponent implements OnInit {
  @Output() emitSearch: EventEmitter<Professor> = new EventEmitter();

  courses: Course[] = [];

  professorForm: FormGroup;

  constructor(
    private professorService: ProfessorService,
    private courseService: CourseService,
    private fb: FormBuilder,
    private matSnack: MatSnackBar,
    @Optional() public dialogRef: MatDialogRef<ProfessorCreateOrEditComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: { id: number }) { // Ako želite da delite podatke sa svojim dijalogom, možete koristiti opciju podataka da biste prosledili informacije komponenti dijaloga. Da biste pristupili podacima u komponenti dijaloga, morate da koristite token za ubrizgavanje MAT_DIALOG_DATA (to je ova linija koda)
    this.professorForm = this.fb.group({
      "id": 0,
      "name": [null, Validators.required],
      "surname": [null, Validators.required],
      "courseIds": null
    })
  }

  async ngOnInit() {
    this.courseService.getAllCourses().pipe(first()).subscribe(result => {
      if (result) {
        this.courses = result;
      }
    });

    if (this.data?.id) {
      this.professorService.getProfessor(this.data.id).pipe(first()).subscribe(professor => {
        this.professorForm.patchValue(professor);
      });
    }
  }

  cancel() {
    this.dialogRef.close();
  }

  submit() {
    if (this.professorForm.valid) {
      this.professorService.updateCreateProfessor(this.professorForm.value).pipe(first())
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

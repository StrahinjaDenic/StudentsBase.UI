import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { mixinHasStickyInput } from '@angular/cdk/table';
import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, Optional, Inject } from '@angular/core';
import { first } from 'rxjs/operators';
import { CourseService } from 'src/app/services/course.service';
import { Course, ValidationResponse } from '../models';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit, OnDestroy {
  //@Input() isSearch: boolean = false;
  @Output() emitSearch: EventEmitter<Course> = new EventEmitter();

  courseForm: FormGroup;

  constructor(
    private courseService: CourseService,
    private fb: FormBuilder,
    private matSnack: MatSnackBar,
    @Optional() public dialogRef: MatDialogRef<CourseComponent>) { //Usluga za otvaranje modalnih dijaloga u Material Design-u (sluzi da se radi sa dijalozima, u ovom slucaju se koristi za close (zatvaranje) dijaloga)
      this.courseForm = this.fb.group ({
        "id": 0,
        "code": [null, Validators.required],
        "name": [null, Validators.required],
        "points": [null, Validators.required],
        "ProfessorIds": [null, Validators.required]
      })
    }

  ngOnDestroy(): void {
        //jedan nacin za unsubscribe, koristi se kod observable koje moraju da ostanu nezavrsene za vreme rada aplikacije
        // courseService.unsubscribe();
  }

  async ngOnInit() {
    //dva nacina za uzimanje rezultata sa back enda

    //prvi nacin
    /*this.course = await this.courseService.getCourseById(1).toPromise(); //
    console.error('ovo se nece izvrsiti dok se to promise ne izvrsi i ne vrati rezultate');
    //drugi nacin*/

    /* this.courseService.getAllCourses().pipe(first()).subscribe(resulst => {
      if (resulst) {
        this.courses = resulst;
      }
    });*/ //Prebaceno u course-search.component.ts!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

   // console.error('ovo ce se izvrsiti odmah nakon prolaska linije iznad, bez cekanja rezultata sa servisa');
    // this.courses =
  }

  cancel() {
      this.courseForm.reset();
      this.emitSearch.emit();
  }

  submit() {
    this.emitSearch.emit(this.courseForm.value)
    return;
  }

}

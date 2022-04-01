import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StudentService } from './../../services/student.service';
import { Student } from './../models/student';
import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, Optional } from '@angular/core';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit, OnDestroy {
  //@Input() isSearch: boolean = false;
  @Output() emitSearch: EventEmitter<Student> = new EventEmitter();

  //students: Student[] = []; // Prebaceno u student-search.ts

 // displayedColumns = ["id", "index", "name", "surname", "dateOfEntry", "dateOfBirth", "placeOfBirth"];

 studentForm: FormGroup;

  constructor(
    private sutdentService: StudentService,
    private fb: FormBuilder,
    @Optional() public dialogRef: MatDialogRef<StudentComponent>) {
    this.studentForm = this.fb.group ({
      "id": 0,
      "index": [null, Validators.required],
      "name": [null, Validators.required],
      "surname": [null, Validators.required],
      "dateOfEntry": [null, Validators.required],
      "dateOfBirth": [null, Validators.required],
      "placeOfBirth": [null, Validators.required]
    })
   }
  ngOnDestroy(): void {
    //jedan nacin za unsubscribe, koristi se kod observable koje moraju da ostanu nezavrsene za vreme rada aplikacije
    //studentService.unsubscribe();
  }

  async ngOnInit() {

   /*  this.sutdentService.getallStudents().pipe(first()).subscribe(result => {
      if (result) {
        this.students = result;
      }
    });*/ // Prebaceno u student-search.ts
  }

  cancel() {
      this.studentForm.reset();
      this.emitSearch.emit();
  }

  submit() {
    this.emitSearch.emit(this.studentForm.value);
    return;
  }

}

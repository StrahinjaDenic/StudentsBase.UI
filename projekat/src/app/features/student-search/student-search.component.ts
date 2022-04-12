import { ValidationResponse } from './../models/validation-response';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StudentCreateOrEditComponent } from './../student-create-or-edit/student-create-or-edit.component';
import { first, debounceTime } from 'rxjs/operators';
import { StudentService } from './../../services/student.service';
import { Student } from './../models/student';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-student-search',
  templateUrl: './student-search.component.html',
  styleUrls: ['./student-search.component.scss']
})
export class StudentSearchComponent implements OnInit {

  students: Student[] = [];

  displayedColumns = ["id", "index", "name", "surname", "dateOfEntry", "dateOfBirth", "placeOfBirth", "gradeAverage", "actions"];
  totalElements: number = 0;
  showLoader: boolean = false;

  constructor(
    private studentService: StudentService,
    private matDialog: MatDialog,
    private matSnack: MatSnackBar) {
      this.search(null);
     }

  async ngOnInit() {
    this.studentService.getallStudents().pipe(first()).subscribe(result => {
      if (result) {
        this.students = result;
      }
    });
  }

  search(parameters: Student | null) {
    this.showLoader = true;
    this.studentService.searchStudent(parameters).pipe(first(),debounceTime(2000)).subscribe(
      result => {
        if (result) {
          this.students = result;
          this.totalElements = result.length;
          this.showLoader = false;
        }
      });
  }

  openDetails(id: number) {
    this.matDialog.open(StudentCreateOrEditComponent, {data: {id: id} }).afterClosed().pipe().subscribe(x => {
      if (x) this.search(null);
    })
  }

  deleteItem(id: number) {
    this.studentService.deleteStudent(id).pipe(first()).subscribe((x :ValidationResponse) => {
      if (x.isSuccess) {
        this.matSnack.open(x.message, undefined, { duration: 4000, panelClass: ['successSnack'] })
        this.search(null);
      } else {
        this.matSnack.open(x.message ?? "Error occured!", undefined, { duration: 4000, panelClass: ['errorSnack'] })
      }
    });
  }

  //VIDETI KAKO UBACITI U PADAJUCOJ LISTI IME PREZIME - PREDMET
}

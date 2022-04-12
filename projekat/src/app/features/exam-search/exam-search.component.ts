import { ValidationResponse } from './../models/validation-response';
import { MatSnackBar } from '@angular/material/snack-bar';
import { first, debounceTime } from 'rxjs/operators';
import { ExamService } from './../../services/exam.service';
import { Exam } from './../models/exam';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ExamCreateOrEditComponent } from '../exam-create-or-edit/exam-create-or-edit.component';

@Component({
  selector: 'app-exam-search',
  templateUrl: './exam-search.component.html',
  styleUrls: ['./exam-search.component.scss']
})
export class ExamSearchComponent implements OnInit {

  exams: Exam[] = [];

  displayedColumns = ["id", "index", "courseName", "year", "mark", "examDate", "grade", "points", "actions"];
  totalElements: number = 0;
  showLoader: boolean = false;

  constructor(
    private examService: ExamService,
    private matDialog: MatDialog,
    private matSnack: MatSnackBar) {
      this.search(null);
     }

  ngOnInit(): void {
    this.examService.getallExams().pipe(first()).subscribe(result => {
      if (result) {
        this.exams = result;
      }
    });
  }

  search(parametars: Exam | null) {
    this.showLoader = true;
    this.examService.searchExams(parametars).pipe(first(),debounceTime(2000)).subscribe(
      result => {
        if (result) {
          this.exams = result;
          this.totalElements = result.length;
          this.showLoader = false;
        }
      });
  }

  openDetails(id: number) {
    this.matDialog.open(ExamCreateOrEditComponent, {data: { id: id } }).afterClosed().pipe().subscribe(x => {
      if (x) {
        this.search(null)
      }
    });
  }

  deleteItem(id: number) {
    this.examService.deleteExam(id).pipe(first()).subscribe((x : ValidationResponse) => {
      if (x.isSuccess) {
        this.matSnack.open(x.message, undefined, {duration: 4000, panelClass: ['successSnack']})
        this.search(null);
      }
      else {
        this.matSnack.open( x.message ?? "Error occured!", undefined, { duration: 4000, panelClass: ['errorSnack'] })
      }
    });
  }

}

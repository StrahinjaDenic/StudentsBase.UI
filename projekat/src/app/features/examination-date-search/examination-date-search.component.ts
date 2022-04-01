import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { debounceTime, first } from 'rxjs/operators';
import { ExaminationDateService } from './../../services/examinationDate.service';
import { ExaminationDate } from './../models/examinationDate';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ExaminationDateComponent } from '../examination-date/examination-date.component';
import { MatPaginator } from '@angular/material/paginator';
import { ExaminationDateCreateOrEditComponent } from '../examination-date-create-or-edit/examination-date-create-or-edit.component';

@Component({
  selector: 'app-examination-date-search',
  templateUrl: './examination-date-search.component.html',
  styleUrls: ['./examination-date-search.component.scss']
})
export class ExaminationDateSearchComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  examinationDates: ExaminationDate[] = [];

  dataSource = new MatTableDataSource(this.examinationDates);

  displayedColumns = ["id", "year", "mark", "name", "dateCreated", "dateModified", "actions"];
  totalElements: number = 0;
  showLoader: boolean = false;

  constructor(
    private eDateService: ExaminationDateService,
    private matDialog: MatDialog,
    private matSnack: MatSnackBar) {
      this.search(null);
     }

  ngOnInit(): void {

    this.eDateService.getAllExaminationDate().pipe(first()).subscribe(result => {
      if (result) {
        this.examinationDates = result
      }
    });
  }

  search(parameters: ExaminationDate | null) {
    this.showLoader = true;
    this.eDateService.searchExaminationDate(parameters).pipe(first(),debounceTime(2000)).subscribe(
      result  => {
        if (result) {
          this.examinationDates = result;
          this.totalElements = result.length;
          this.showLoader = false;
        }
      });
  }

  openDetails(id: number) {
    this.matDialog.open(ExaminationDateCreateOrEditComponent, {data: {id: id} }).afterClosed().pipe().subscribe(x => {
      if (x) this.search(null);
    });
  }

  deleteItem(id: number) {
    this.eDateService.deleteExaminationDate(id).pipe(first()).subscribe(x => {
      if (x === true) {
        this.matSnack.open("Succesfully deleted!","Notification", {duration: 4000, panelClass: ['successSnack'] })
        this.search(null);
      }
      else {
        this.matSnack.open("Error occured!", 'Error', {duration: 4000, panelClass: ['errorSnack'] })
      }
    });
  }

}

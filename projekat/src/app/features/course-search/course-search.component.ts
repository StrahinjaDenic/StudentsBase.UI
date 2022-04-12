import { ValidationResponse } from './../models/validation-response';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CourseComponent } from './../course/course.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { first, debounceTime } from 'rxjs/operators';
import { CourseService } from './../../services/course.service';
import { Course } from './../models/course';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CourseCreateOrEditComponent } from '../course-create-or-edit/course-create-or-edit.component';

@Component({
  selector: 'app-course-search',
  templateUrl: './course-search.component.html',
  styleUrls: ['./course-search.component.scss']
})
export class CourseSearchComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  courses: Course[] = [];

  //generic part
  /*displayedColumns: MatColumns[] = [
    { title: 'Id', key: 'id' },
    { title: 'Code', key: 'code' },
    { title: 'Points', key: 'points' }];*/
  dataSource = new MatTableDataSource(this.courses); // KAKO OVO RADIIII???

  //columnNames: string[];
  //baseColumNames: string[] = ['dateCreated', 'dateModified', 'actions'];
  displayedColumns = ["id", "code", "name", "points", "actions" ];
  totalElements: number = 0;
  showLoader: boolean = false;


  constructor(
    private courseService: CourseService,
    private matDialog: MatDialog,
    private matSnack: MatSnackBar) {
      //this.columnNames = this.displayedColumns.map(x => x.key);
      //this.columnNames = this.columnNames.concat(this.baseColumNames);
      this.search(null);
    }

  ngOnInit(): void {

    this.courseService.getAllCourses().pipe(first()).subscribe(result => {
      if (result) {
        this.courses = result;
      }
    });
  }

  search(parameters: Course | null) {
    this.showLoader = true;
    this.courseService.searchCourses(parameters).pipe(first(),debounceTime(2000)).subscribe( result => {
      if (result) {
        this.courses = result;
        this.totalElements = result.length;
        this.showLoader = false;
      }
    });
  }

  openDetails(id: number) {
    this.matDialog.open(CourseCreateOrEditComponent, {data: { id: id } }).afterClosed().pipe().subscribe(x => {
      if (x) this.search(null);
    });
  }

  deleteItem(id: number) {
    this.courseService.deleteCourse(id).pipe(first()).subscribe((x: ValidationResponse) => {
      if (x.isSuccess) {
        this.matSnack.open(x.message, undefined, {duration: 4000, panelClass: ['successSnack'] });
        this.search(null);
      }
      else {
        this.matSnack.open(x.message ?? "Error occured!", undefined, {duration: 4000, panelClass: ['errorSnack'] });
      }
    })
  }
}

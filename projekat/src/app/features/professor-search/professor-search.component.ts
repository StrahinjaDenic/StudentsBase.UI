import { ProfessorCreateOrEditComponent } from './../professor-create-or-edit/professor-create-or-edit.component';
import { ValidationResponse } from './../models/validation-response';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProfessorComponent } from './../professor/professor.component';
import { debounceTime, first } from 'rxjs/operators';
import { Professor } from './../models/professor';
import { Component, OnInit } from '@angular/core';
import { ProfessorService } from 'src/app/services/professor.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-professor-search',
  templateUrl: './professor-search.component.html',
  styleUrls: ['./professor-search.component.scss']
})
export class ProfessorSearchComponent implements OnInit {

  professors: Professor[] = [];

  displayedColumns = ["id", "name", "surname", "actions"];
  totalElements: number = 0;
  showLoader: boolean = false;

  constructor(
    private professorService: ProfessorService,
    private matDialog: MatDialog,
    private matSnack: MatSnackBar) {
      this.search(null);
     }

  ngOnInit(): void {
    this.professorService.getallProfessors().pipe(first()).subscribe(result => {
      if (result) {
        this.professors = result;
      }
    });
  }

  search(parameters: Professor | null) {
    this.showLoader = true;
    this.professorService.searchProfessor(parameters).pipe(first(),debounceTime(2000)).subscribe(
      result => {
        if (result) {
          this.professors = result;
          this.totalElements = result.length;
          this.showLoader = false;
        }
      });
  }

  openDetails(id: number) {
    this.matDialog.open(ProfessorCreateOrEditComponent, {data: { id: id} }).afterClosed().pipe().subscribe(x => {
      if (x) {
        this.search(null)
      }
    });
  }

  deleteItem(id: number) {
    this.professorService.deleteProfessor(id).pipe(first()).subscribe((x : ValidationResponse) => {
      if (x.isSuccess) {
        this.matSnack.open(x.message, undefined, { duration: 4000, panelClass: ['successSnack'] })
        this.search(null);
      } else {
        this.matSnack.open(x.message ?? "Error occured!", undefined, { duration: 4000, panelClass: ['errorSnack'] })
      }
    });
  }

}

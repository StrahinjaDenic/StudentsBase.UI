import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Professor } from './../models/professor';
import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, Optional } from '@angular/core';

@Component({
  selector: 'app-professor',
  templateUrl: './professor.component.html',
  styleUrls: ['./professor.component.scss']
})
export class ProfessorComponent implements OnInit, OnDestroy {
  //@Input() isSearch: boolean = false;
  @Output() emitSearch: EventEmitter<Professor> = new EventEmitter();

  professorForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    @Optional() public dialogRef: MatDialogRef<ProfessorComponent>) {
      this.professorForm = this.fb.group ({
        "id": 0,
        "name": [null, Validators.required],
        "surname": [null, Validators.required],
        "courseIds": [null, Validators.required]
      })
     }

  ngOnDestroy(): void {
    //jedan nacin za unsubscribe, koristi se kod observable koje moraju da ostanu nezavrsene za vreme rada aplikacije
    //professorService.unsubscribe();
  }

  async ngOnInit() {
  }

  cancel() {
      this.professorForm.reset();
      this.emitSearch.emit();
  }

  submit() {
      this.emitSearch.emit(this.professorForm.value);
      return;
  }

}

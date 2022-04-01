import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ExaminationDateService } from './../../services/examinationDate.service';
import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, Optional } from '@angular/core';
import { ExaminationDate } from '../models';

@Component({
  selector: 'app-examination-date',
  templateUrl: './examination-date.component.html',
  styleUrls: ['./examination-date.component.scss']
})
export class ExaminationDateComponent implements OnInit, OnDestroy {
  //@Input() isSearch: boolean = false;
  @Output() emitSearch: EventEmitter<ExaminationDate> = new EventEmitter();

  //examinationDates: ExaminationDate[] = []; //Prebaceno u search.component.ts

  examinationDateForm: FormGroup;

  constructor(
    private examinationDateService: ExaminationDateService,
    private fb: FormBuilder,
    @Optional() public dialogRef: MatDialogRef<ExaminationDateComponent>) {
     this.examinationDateForm = this.fb.group({
       "id": 0,
       "year": [null, Validators.required],
       "mark": [null, Validators.required],
       "name": [null, Validators.required]
     })
    }

  ngOnDestroy(): void {
     //jedan nacin za unsubscribe, koristi se kod observable koje moraju da ostanu nezavrsene za vreme rada aplikacije
     // examinationDateService.unsubscribe();
  }

  async ngOnInit() {

    /* this.examinationDateService.getAllExaminationDate().pipe(first()).subscribe(result => {
      if (result) {
        this.examinationDates = result;
      }
    });*/ //Prebaceno u search.component.ts!!!!!!!!!!!!!!
  }

  cancel() {
      this.examinationDateForm.reset();
      this.emitSearch.emit();
  }

  submit() {
    this.emitSearch.emit(this.examinationDateForm.value);
    return;
  }

}

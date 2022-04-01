import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ExamService } from './../../services/exam.service';
import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Exam } from '../models';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent implements OnInit, OnDestroy {
  @Output() emitSearch: EventEmitter<Exam> = new EventEmitter();

  examForm: FormGroup;

  exams: Exam[] = [];

  displayedColumns = ["id", "index", "courseName", "year", "mark", "examDate", "grade", "points"];

  constructor(
    private examService: ExamService,
    private fb: FormBuilder) {
    this.examForm = this.fb.group({
      "id": 0,
      "index": [null, Validators.required],
      "courseName": [null, Validators.required],
      "year": [null, Validators.required],
      "mark": [null, Validators.required],
      "grade": [null, Validators.required],
      "examDate": [null, Validators.required],
      "points": [null, Validators.required]
    })
   }
  ngOnDestroy(): void {
    //jedan nacin za unsubscribe, koristi se kod observable koje moraju da ostanu nezavrsene za vreme rada aplikacije
       //examService.unsubscribe();
  }

  async ngOnInit() {
     this.examService.getallExams().pipe(first()).subscribe(result => {
      if (result) {
        this.exams = result;
      }
    });
  }

  cancel() {
    this.examForm.reset();
    this.emitSearch.emit();
  }

  submit() {
    this.emitSearch.emit(this.examForm.value)
    return;
  }

}

import { ValidationResponse } from './../features/models/validation-response';
import { Exam } from './../features/models/exam';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable } from 'rxjs';


@Injectable()
export class ExamService {

  readonly baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getallExams(): Observable<Exam[]> {
    return this.http.get<Exam[]>(this.baseUrl + `Exam/Index`);
  }

  updateCreateExam(exam: Exam): Observable<ValidationResponse> {
    return this.http.post<ValidationResponse>(this.baseUrl + `Exam/Save`, exam);
  }

  getExam(id: number): Observable<Exam> {
    return this.http.get<Exam>(this.baseUrl + `Exam/Edit?id=` + `${id}`);
  }

  deleteExam(id: number): Observable<boolean> {
    return this.http.delete<boolean>(this.baseUrl + `Exam/Delete?id=` + `${id}`);
  }

  searchExams = (exam: Exam | null): Observable<Exam[]> => {
    let fullRoute = this.baseUrl + 'Exam/Index';
    if (exam) {
      fullRoute += "?";
      if (exam.index && exam.index > 0) fullRoute = fullRoute + `index=${exam.index}&`;
      if (exam.courseName && exam.courseName.length > 0) fullRoute = fullRoute + `courseName=${exam.courseName}&`;
      if (exam.examDate) fullRoute = fullRoute + `examDate=${exam.examDate}&`; // Metoda .toDateString vraća datum (ne vreme) objekta datuma kao string.
    }

    return this.http.get<Exam[]>(fullRoute);
  };
}

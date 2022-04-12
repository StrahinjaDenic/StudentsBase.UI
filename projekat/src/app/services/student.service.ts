import { ProfessorCourses } from './../features/models/professorCourses';
import { ValidationResponse } from './../features/models/validation-response';
import { Student } from './../features/models/student';
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable()
export class StudentService {

  readonly baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getallStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.baseUrl + `Student/Index`);
  }

  updateCreateStudent(student: Student): Observable<ValidationResponse> {
    return this.http.post<ValidationResponse>(this.baseUrl + `Student/Save`, student);
  }

  getStudent(id:number): Observable<Student> {
    return this.http.get<Student>(this.baseUrl + `Student/Edit?studentId=` + `${id}`);
  }

  deleteStudent(id: number): Observable<ValidationResponse> {
    return this.http.delete<ValidationResponse>(this.baseUrl + `Student/Delete?studentId=` + `${id}`);
  }

  searchStudent = (student: Student | null): Observable<Student[]> => {
    let fullRute = this.baseUrl + `Student/Index`;
    if (student) {
      fullRute += "?";
      if (student.name && student.name.length > 0) fullRute = fullRute + `name=${student.name}&`;
      if (student.surname && student.surname.length > 0) fullRute = fullRute + `surname=${student.surname}&`;
      if (student.index && student.index > 0) fullRute = fullRute + `index=${student.index}&`;
    }

    return this.http.get<Student[]>(fullRute);
  };

  getProfessorCourses(): Observable<ProfessorCourses[]> {
    return this.http.get<ProfessorCourses[]>(this.baseUrl + `Student/ProfessorCourses`);
  }
}

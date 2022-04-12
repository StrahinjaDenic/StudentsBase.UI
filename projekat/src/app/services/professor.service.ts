import { ValidationResponse } from './../features/models/validation-response';
import { Professor } from './../features/models/professor';
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable()
export class ProfessorService {

  readonly baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  searchCourses = (professor: Professor | null): Observable<Professor[]> => {
    let fullRute = this.baseUrl + 'Professor/Index';
    if (professor) {
      fullRute += "?";
      if(professor.name && professor.name.length > 0) fullRute = fullRute + `name=${professor.name}&`;
      if(professor.surname && professor.surname.length > 0) fullRute = fullRute + `surname=${professor.surname}&`;
    }

    return this.http.get<Professor[]>(fullRute);
  };

  deleteProfessor(id: number): Observable<ValidationResponse> {
    return this.http.delete<ValidationResponse>(this.baseUrl + `Professor/Delete?professorId=` + `${id}`);
  }

  //updateCreateProfessor = (professor: Professor) => this.http.post<ValidationResponse>(this.baseUrl, professor);

  updateCreateProfessor(professor: Professor): Observable<ValidationResponse> {
    return this.http.post<ValidationResponse>(this.baseUrl + `Professor/Save`, professor);
  }

  getProfessor = (id: number): Observable<Professor> => this.http.get<Professor>(this.baseUrl + `Professor/Edit?id=` + `${id}`);

  getallProfessors(): Observable<Professor[]> {
    return this.http.get<Professor[]>(this.baseUrl + `Professor/Index`);
  }

  searchProfessor = (professor: Professor | null): Observable<Professor[]> => {
    let fullRoute = this.baseUrl + `Professor/Index`;
    if (professor) {
        fullRoute += "?";
        if (professor.name && professor.name.length > 0) fullRoute = fullRoute + `name=${professor.name}&`;
        if (professor.surname && professor.surname.length > 0) fullRoute = fullRoute + `surname=${professor.surname}&`;
    }

    return this.http.get<Professor[]>(fullRoute);
};
}

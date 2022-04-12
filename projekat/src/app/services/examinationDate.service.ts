import { ExaminationDate } from './../features/models/examinationDate';
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { ValidationResponse } from '../features/models';

@Injectable()
export class ExaminationDateService {

  readonly baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  searchExaminationDate = (eDate: ExaminationDate | null): Observable<ExaminationDate[]> => {
    let fullRute = this.baseUrl + 'ExaminationDate/Index';
    if (eDate) {
      fullRute += "?";
      if(eDate.year && eDate.year > 0) fullRute = fullRute + `year=${eDate.year}&`;
      if(eDate.name && eDate.name.length > 0) fullRute = fullRute + `name=${eDate.name}&`;
    }

    return this.http.get<ExaminationDate[]>(fullRute);
  }

  //deleteExaminationDate = (id: number) => this.http.delete<boolean>(this.baseUrl + `${id}`);
  deleteExaminationDate(id: number): Observable<ValidationResponse>{
    return this.http.delete<ValidationResponse>(this.baseUrl + `ExaminationDate/Delete?examinationDateId=` + `${id}`);
  }

  updateCreateExaminationDate = (examinationDate: ExaminationDate) => this.http.post<ValidationResponse>(this.baseUrl + `ExaminationDate/Save`, examinationDate);

  getEaminationDate(id: number): Observable<ExaminationDate> {
    return this.http.get<ExaminationDate>(this.baseUrl + `ExaminationDate/Edit?examinationDateId=` + `${id}`);
  }

  getAllExaminationDate(): Observable<ExaminationDate[]>{
    return this.http.get<ExaminationDate[]>(this.baseUrl + `ExaminationDate/Index`);
  }
}

import { ValidationResponse } from './../features/models/validation-response';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable } from 'rxjs';
import { Login } from '../features/models';
import { map } from 'rxjs/operators';

@Injectable({providedIn: "root"})
export class LoginService {


  islogin: boolean = false;
  readonly baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  loginCheck(login : Login): Observable<ValidationResponse> {
    return this.http.post<ValidationResponse>(this.baseUrl + `Login/LoginCheck`, login).pipe(map(x => {
      this.islogin = x.isSuccess;
      return x;
    }));
  }
}

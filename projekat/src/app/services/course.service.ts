import { Injectable, NgModule } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Course, ValidationResponse } from '../features/models';

// @Injectable({ providedIn: 'root' })  //ako se ovo stavi onda ne mora da se deifinse unutar app module-a, ako ovoga nema onda omra da bude u nekom provideru
@Injectable()
export class CourseService {

    readonly baseUrl = environment.apiUrl;
    constructor(private http: HttpClient) { }

    searchCourses = (course: Course | null): Observable<Course[]> => {
      let fullRute = this.baseUrl + 'Course/Index';
      if (course) {
        fullRute += "?";
        if(course.code && course.code.length > 0) fullRute = fullRute + `code=${course.code}&`;
        if(course.name && course.name.length > 0) fullRute = fullRute + `name=${course.name}&`;
      }

      return this.http.get<Course[]>(fullRute);
    };

    //deleteCourse = (id: number) => this.http.delete<boolean>(this.baseUrl + `Course/Delete?courseId=` + `${id}`);
    deleteCourse(id: number): Observable<boolean> {
      return this.http.delete<boolean>(this.baseUrl + `Course/Delete?courseId=` + `${id}`);
    }

   // updateCreateCourse = (course: Course) => this.http.post<ValidationResponse>(this.baseUrl, course);
    updateCreateCourse(course: Course): Observable<ValidationResponse> {
      return this.http.post<ValidationResponse>(this.baseUrl + `Course/Save`, course);
    }
    getCourse = (id: number): Observable<Course> => this.http.get<Course>(this.baseUrl + `Course/Edit?courseId=` +`${id}`);

    //dodati sve ostali
    getAllCourses(): Observable<Course[]> {
        return this.http.get<Course[]>(this.baseUrl + `Course/Index`);
    }

    /*getCourseById(id:number): Observable<Course> {
        return this.http.get<Course>(this.baseUrl + `id`);
    }*/

}

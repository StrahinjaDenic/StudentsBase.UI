import { LoginComponent } from './login/login.component';
import { ExamSearchComponent } from './exam-search/exam-search.component';
import { StudentSearchComponent } from './student-search/student-search.component';
import { ProfessorSearchComponent } from './professor-search/professor-search.component';
import { ExaminationDateSearchComponent } from './examination-date-search/examination-date-search.component';
import { CourseSearchComponent } from './course-search/course-search.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: StudentSearchComponent
    },
    {
        path: 'courses',
        component: CourseSearchComponent
    },
    {
      path: 'students',
      component: StudentSearchComponent
    },
    {
      path: 'examinationDate',
      component: ExaminationDateSearchComponent
    },
    {
      path: 'professors',
      component: ProfessorSearchComponent
    },
    {
      path: 'exams',
      component: ExamSearchComponent
    },
    {
      path: 'login',
      component: LoginComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)]
})
export class FeatureRoutingModule { }

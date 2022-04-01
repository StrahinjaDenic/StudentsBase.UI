import { ExamService } from './../services/exam.service';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FeatureRoutingModule } from './feature.routing';
import { CourseComponent } from './course/course.component';
import { CourseService } from '../services/course.service';
import { StudentComponent } from './student/student.component';
import { StudentService } from './../services/student.service';
import { ExaminationDateComponent } from './examination-date/examination-date.component';
import { ExaminationDateService } from './../services/examinationDate.service';
import { ProfessorComponent } from './professor/professor.component';
import { ProfessorService } from '../services/professor.service';
import { ExamComponent } from './exam/exam.component';
import { CourseSearchComponent } from './course-search/course-search.component';
import { ExaminationDateSearchComponent } from './examination-date-search/examination-date-search.component';
import { ProfessorSearchComponent } from './professor-search/professor-search.component';
import { StudentSearchComponent } from './student-search/student-search.component';
import { ProfessorCreateOrEditComponent } from './professor-create-or-edit/professor-create-or-edit.component';
import { CourseCreateOrEditComponent } from './course-create-or-edit/course-create-or-edit.component';
import { ExaminationDateCreateOrEditComponent } from './examination-date-create-or-edit/examination-date-create-or-edit.component';
import { StudentCreateOrEditComponent } from './student-create-or-edit/student-create-or-edit.component';
import { ExamSearchComponent } from './exam-search/exam-search.component';
import { ExamCreateOrEditComponent } from './exam-create-or-edit/exam-create-or-edit.component';
import { LoginComponent } from './login/login.component';

@NgModule({
    declarations: [
      CourseComponent,
      StudentComponent,
      ExaminationDateComponent,
      ProfessorComponent,
      ExamComponent,
      CourseSearchComponent,
      ExaminationDateSearchComponent,
      ProfessorSearchComponent,
      StudentSearchComponent,
      ProfessorCreateOrEditComponent,
      CourseCreateOrEditComponent,
      ExaminationDateCreateOrEditComponent,
      StudentCreateOrEditComponent,
      ExamSearchComponent,
      ExamCreateOrEditComponent,
      LoginComponent],
    imports: [
      SharedModule,
      FeatureRoutingModule],
    exports: [],
    providers: [
      CourseService,
      StudentService,
      ExaminationDateService,
      ProfessorService,
      ExamService],
})
export class FeatureModule { }

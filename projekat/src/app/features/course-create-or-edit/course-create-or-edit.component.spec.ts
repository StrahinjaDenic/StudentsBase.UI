import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseCreateOrEditComponent } from './course-create-or-edit.component';

describe('CourseCreateOrEditComponent', () => {
  let component: CourseCreateOrEditComponent;
  let fixture: ComponentFixture<CourseCreateOrEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseCreateOrEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseCreateOrEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

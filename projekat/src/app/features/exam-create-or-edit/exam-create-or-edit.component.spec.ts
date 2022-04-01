import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamCreateOrEditComponent } from './exam-create-or-edit.component';

describe('ExamCreateOrEditComponent', () => {
  let component: ExamCreateOrEditComponent;
  let fixture: ComponentFixture<ExamCreateOrEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamCreateOrEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamCreateOrEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExaminationDateCreateOrEditComponent } from './examination-date-create-or-edit.component';

describe('ExaminationDateCreateOrEditComponent', () => {
  let component: ExaminationDateCreateOrEditComponent;
  let fixture: ComponentFixture<ExaminationDateCreateOrEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExaminationDateCreateOrEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExaminationDateCreateOrEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

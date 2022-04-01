import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExaminationDateComponent } from './examination-date.component';

describe('ExaminationDateComponent', () => {
  let component: ExaminationDateComponent;
  let fixture: ComponentFixture<ExaminationDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExaminationDateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExaminationDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExaminationDateSearchComponent } from './examination-date-search.component';

describe('ExaminationDateSearchComponent', () => {
  let component: ExaminationDateSearchComponent;
  let fixture: ComponentFixture<ExaminationDateSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExaminationDateSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExaminationDateSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

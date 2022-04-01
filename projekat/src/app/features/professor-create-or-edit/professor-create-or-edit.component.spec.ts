import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorCreateOrEditComponent } from './professor-create-or-edit.component';

describe('ProfessorCreateOrEditComponent', () => {
  let component: ProfessorCreateOrEditComponent;
  let fixture: ComponentFixture<ProfessorCreateOrEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfessorCreateOrEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessorCreateOrEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

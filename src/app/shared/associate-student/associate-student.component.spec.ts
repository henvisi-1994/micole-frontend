import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociateStudentComponent } from './associate-student.component';

describe('AssociateStudentComponent', () => {
  let component: AssociateStudentComponent;
  let fixture: ComponentFixture<AssociateStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssociateStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociateStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

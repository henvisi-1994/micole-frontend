import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseStudentCardComponent } from './case-student-card.component';

describe('CaseStudentCardComponent', () => {
  let component: CaseStudentCardComponent;
  let fixture: ComponentFixture<CaseStudentCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseStudentCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseStudentCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

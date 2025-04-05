import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseSubjectCardComponent } from './course-subject-card.component';

describe('CourseSubjectCardComponent', () => {
  let component: CourseSubjectCardComponent;
  let fixture: ComponentFixture<CourseSubjectCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseSubjectCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseSubjectCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

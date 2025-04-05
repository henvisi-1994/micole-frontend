import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseSubjectShowComponent } from './course-subject-show.component';

describe('CourseSubjectShowComponent', () => {
  let component: CourseSubjectShowComponent;
  let fixture: ComponentFixture<CourseSubjectShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseSubjectShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseSubjectShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

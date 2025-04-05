import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseByTeacherComponent } from './course-by-teacher.component';

describe('CourseByTeacherComponent', () => {
  let component: CourseByTeacherComponent;
  let fixture: ComponentFixture<CourseByTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseByTeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseByTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

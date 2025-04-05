import { TestBed } from '@angular/core/testing';

import { CanShowStudentCourseGuard } from './can-show-student-course.guard';

describe('CanShowStudentCourseGuard', () => {
  let guard: CanShowStudentCourseGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanShowStudentCourseGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

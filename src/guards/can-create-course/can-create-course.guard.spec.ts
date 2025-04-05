import { TestBed } from '@angular/core/testing';

import { CanCreateCourseGuard } from './can-create-course.guard';

describe('CanCreateCourseGuard', () => {
  let guard: CanCreateCourseGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanCreateCourseGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

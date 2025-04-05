import { TestBed } from '@angular/core/testing';

import { CanShowTeacherGuard } from './can-show-teacher.guard';

describe('CanShowTeacherGuard', () => {
  let guard: CanShowTeacherGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanShowTeacherGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

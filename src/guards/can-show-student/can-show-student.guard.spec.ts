import { TestBed } from '@angular/core/testing';

import { CanShowStudentGuard } from './can-show-student.guard';

describe('CanShowStudentGuard', () => {
  let guard: CanShowStudentGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanShowStudentGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

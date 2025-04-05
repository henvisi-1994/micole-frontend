import { TestBed } from '@angular/core/testing';

import { CanEditSchoolGuard } from './can-edit-school.guard';

describe('CanEditSchoolGuard', () => {
  let guard: CanEditSchoolGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanEditSchoolGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

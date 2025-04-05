import { TestBed } from '@angular/core/testing';

import { CanCreateSchoolGuard } from './can-create-school.guard';

describe('CanCreateSchoolGuard', () => {
  let guard: CanCreateSchoolGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanCreateSchoolGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

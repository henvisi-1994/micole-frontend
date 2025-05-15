import { TestBed } from '@angular/core/testing';

import { CanExclisionSubjectGuard } from './can-exclision-subject.guard';

describe('CanExclisionSubjectGuard', () => {
  let guard: CanExclisionSubjectGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanExclisionSubjectGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

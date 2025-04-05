import { TestBed } from '@angular/core/testing';

import { CanCreateObservationsGuard } from './can-create-observations.guard';

describe('CanCreateObservationsGuard', () => {
  let guard: CanCreateObservationsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanCreateObservationsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

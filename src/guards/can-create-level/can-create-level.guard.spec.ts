import { TestBed } from '@angular/core/testing';

import { CanCreateLevelGuard } from './can-create-level.guard';

describe('CanCreateLevelGuard', () => {
  let guard: CanCreateLevelGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanCreateLevelGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

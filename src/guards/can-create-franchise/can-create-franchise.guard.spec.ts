import { TestBed } from '@angular/core/testing';

import { CanCreateFranchiseGuard } from './can-create-franchise.guard';

describe('CanCreateFranchiseGuard', () => {
  let guard: CanCreateFranchiseGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanCreateFranchiseGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

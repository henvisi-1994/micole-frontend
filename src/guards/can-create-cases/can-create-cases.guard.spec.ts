import { TestBed } from '@angular/core/testing';

import { CanCreateCasesGuard } from './can-create-cases.guard';

describe('CanCreateCasesGuard', () => {
  let guard: CanCreateCasesGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanCreateCasesGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

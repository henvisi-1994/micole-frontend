import { TestBed } from '@angular/core/testing';

import { ValidateAccountGuard } from './validate-account.guard';

describe('ValidateAccountGuard', () => {
  let guard: ValidateAccountGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ValidateAccountGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

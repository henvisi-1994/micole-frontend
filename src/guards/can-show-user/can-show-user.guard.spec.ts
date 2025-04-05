import { TestBed } from '@angular/core/testing';

import { CanShowUserGuard } from './can-show-user.guard';

describe('CanShowUserGuard', () => {
  let guard: CanShowUserGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanShowUserGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

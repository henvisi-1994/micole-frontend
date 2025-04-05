import { TestBed } from '@angular/core/testing';

import { CanSeeCasesGuard } from './can-see-cases.guard';

describe('CanSeeCasesGuard', () => {
  let guard: CanSeeCasesGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanSeeCasesGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

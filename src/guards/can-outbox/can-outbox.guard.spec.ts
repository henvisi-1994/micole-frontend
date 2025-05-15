import { TestBed } from '@angular/core/testing';

import { CanOutboxGuard } from './can-outbox.guard';

describe('CanOutboxGuard', () => {
  let guard: CanOutboxGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanOutboxGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

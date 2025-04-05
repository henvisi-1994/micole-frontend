import { TestBed } from '@angular/core/testing';

import { CanShowStatsGuard } from './can-show-stats.guard';

describe('CanShowStatsGuard', () => {
  let guard: CanShowStatsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanShowStatsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

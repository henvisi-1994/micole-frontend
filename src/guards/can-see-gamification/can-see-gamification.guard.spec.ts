import { TestBed } from '@angular/core/testing';

import { CanSeeGamificationGuard } from './can-see-gamification.guard';

describe('CanSeeGamificationGuard', () => {
  let guard: CanSeeGamificationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanSeeGamificationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

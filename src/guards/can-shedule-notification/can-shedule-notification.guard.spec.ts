import { TestBed } from '@angular/core/testing';

import { CanSheduleNotificationGuard } from './can-shedule-notification.guard';

describe('CanSheduleNotificationGuard', () => {
  let guard: CanSheduleNotificationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanSheduleNotificationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

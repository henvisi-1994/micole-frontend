import { TestBed } from '@angular/core/testing';

import { StudentReferralService } from './student-referral.service';

describe('StudentReferralService', () => {
  let service: StudentReferralService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentReferralService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

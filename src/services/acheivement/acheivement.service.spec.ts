import { TestBed } from '@angular/core/testing';

import { AcheivementService } from './acheivement.service';

describe('AcheivementService', () => {
  let service: AcheivementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcheivementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

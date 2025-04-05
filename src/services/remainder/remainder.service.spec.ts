import { TestBed } from '@angular/core/testing';

import { RemainderService } from './remainder.service';

describe('RemainderService', () => {
  let service: RemainderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RemainderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

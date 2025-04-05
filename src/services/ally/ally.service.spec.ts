import { TestBed } from '@angular/core/testing';

import { AllyService } from './ally.service';

describe('AllyService', () => {
  let service: AllyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

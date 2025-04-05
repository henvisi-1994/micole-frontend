import { TestBed } from '@angular/core/testing';

import { ParametricService } from './parametric.service';

describe('ParametricService', () => {
  let service: ParametricService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParametricService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

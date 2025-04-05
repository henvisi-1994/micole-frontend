import { TestBed } from '@angular/core/testing';

import { CanShowChildrenGuard } from './can-show-children.guard';

describe('CanShowChildrenGuard', () => {
  let guard: CanShowChildrenGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanShowChildrenGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

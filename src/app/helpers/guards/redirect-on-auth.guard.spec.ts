import { TestBed } from '@angular/core/testing';

import { RedirectOnAuthGuard } from './redirect-on-auth.guard';

describe('RedirectOnAuthGuard', () => {
  let guard: RedirectOnAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RedirectOnAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

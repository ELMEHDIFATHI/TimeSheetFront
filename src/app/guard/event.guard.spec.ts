import { TestBed } from '@angular/core/testing';

import { EventGuard } from './event.guard';

describe('EventGuard', () => {
  let guard: EventGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EventGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

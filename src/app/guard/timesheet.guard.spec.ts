import { TestBed } from '@angular/core/testing';

import { TimesheetGuard } from './timesheet.guard';

describe('TimesheetGuard', () => {
  let guard: TimesheetGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TimesheetGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

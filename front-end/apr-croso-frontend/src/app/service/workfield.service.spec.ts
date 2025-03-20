import { TestBed } from '@angular/core/testing';

import { WorkfieldService } from './workfield.service';

describe('WorkfieldService', () => {
  let service: WorkfieldService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkfieldService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

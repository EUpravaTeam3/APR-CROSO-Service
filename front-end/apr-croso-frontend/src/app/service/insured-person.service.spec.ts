import { TestBed } from '@angular/core/testing';

import { InsuredPersonService } from './insured-person.service';

describe('InsuredPersonService', () => {
  let service: InsuredPersonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsuredPersonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

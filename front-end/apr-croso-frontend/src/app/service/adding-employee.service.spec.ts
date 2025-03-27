import { TestBed } from '@angular/core/testing';

import { AddingEmployeeService } from './adding-employee.service';

describe('AddingEmployeeService', () => {
  let service: AddingEmployeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddingEmployeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

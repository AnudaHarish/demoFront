import { TestBed } from '@angular/core/testing';

import { EmpolyeeService } from './empolyee.service';

describe('EmpolyeeService', () => {
  let service: EmpolyeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpolyeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { GetconnecteduseridService } from './getconnecteduserid.service';

describe('GetconnecteduseridService', () => {
  let service: GetconnecteduseridService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetconnecteduseridService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

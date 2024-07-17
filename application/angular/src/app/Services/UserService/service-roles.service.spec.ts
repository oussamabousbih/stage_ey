import { TestBed } from '@angular/core/testing';

import { ServiceRolesService } from './service-roles.service';

describe('ServiceRolesService', () => {
  let service: ServiceRolesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceRolesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

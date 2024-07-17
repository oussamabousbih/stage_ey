import { TestBed } from '@angular/core/testing';

import { ProduitCatServicesService } from './produit-cat-services.service';

describe('ProduitCatServicesService', () => {
  let service: ProduitCatServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProduitCatServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

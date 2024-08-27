import { TestBed } from '@angular/core/testing';

import { CartsItemService } from './carts-item.service';

describe('CartsItemService', () => {
  let service: CartsItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartsItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

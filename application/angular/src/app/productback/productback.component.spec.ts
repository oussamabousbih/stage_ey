import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductbackComponent } from './productback.component';

describe('ProductbackComponent', () => {
  let component: ProductbackComponent;
  let fixture: ComponentFixture<ProductbackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductbackComponent]
    });
    fixture = TestBed.createComponent(ProductbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

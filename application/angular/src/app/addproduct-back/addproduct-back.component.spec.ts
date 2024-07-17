import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddproductBackComponent } from './addproduct-back.component';

describe('AddproductBackComponent', () => {
  let component: AddproductBackComponent;
  let fixture: ComponentFixture<AddproductBackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddproductBackComponent]
    });
    fixture = TestBed.createComponent(AddproductBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

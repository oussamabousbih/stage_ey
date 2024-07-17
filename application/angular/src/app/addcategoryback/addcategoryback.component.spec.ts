import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcategorybackComponent } from './addcategoryback.component';

describe('AddcategorybackComponent', () => {
  let component: AddcategorybackComponent;
  let fixture: ComponentFixture<AddcategorybackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddcategorybackComponent]
    });
    fixture = TestBed.createComponent(AddcategorybackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

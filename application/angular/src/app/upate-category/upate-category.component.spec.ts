import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpateCategoryComponent } from './upate-category.component';

describe('UpateCategoryComponent', () => {
  let component: UpateCategoryComponent;
  let fixture: ComponentFixture<UpateCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpateCategoryComponent]
    });
    fixture = TestBed.createComponent(UpateCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

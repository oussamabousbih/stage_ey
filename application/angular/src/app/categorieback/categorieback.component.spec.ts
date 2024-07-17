import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriebackComponent } from './categorieback.component';

describe('CategoriebackComponent', () => {
  let component: CategoriebackComponent;
  let fixture: ComponentFixture<CategoriebackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoriebackComponent]
    });
    fixture = TestBed.createComponent(CategoriebackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

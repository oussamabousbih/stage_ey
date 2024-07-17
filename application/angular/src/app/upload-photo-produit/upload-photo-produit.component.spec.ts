import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadPhotoProduitComponent } from './upload-photo-produit.component';

describe('UploadPhotoProduitComponent', () => {
  let component: UploadPhotoProduitComponent;
  let fixture: ComponentFixture<UploadPhotoProduitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UploadPhotoProduitComponent]
    });
    fixture = TestBed.createComponent(UploadPhotoProduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

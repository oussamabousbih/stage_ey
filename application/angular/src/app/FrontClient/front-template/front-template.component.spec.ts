import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontTemplateComponent } from './front-template.component';

describe('FrontTemplateComponent', () => {
  let component: FrontTemplateComponent;
  let fixture: ComponentFixture<FrontTemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FrontTemplateComponent]
    });
    fixture = TestBed.createComponent(FrontTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

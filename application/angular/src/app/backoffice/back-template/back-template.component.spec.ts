import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackTemplateComponent } from './back-template.component';

describe('BackTemplateComponent', () => {
  let component: BackTemplateComponent;
  let fixture: ComponentFixture<BackTemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BackTemplateComponent]
    });
    fixture = TestBed.createComponent(BackTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

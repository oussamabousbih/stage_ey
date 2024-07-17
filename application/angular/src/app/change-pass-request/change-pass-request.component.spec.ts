import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePassRequestComponent } from './change-pass-request.component';

describe('ChangePassRequestComponent', () => {
  let component: ChangePassRequestComponent;
  let fixture: ComponentFixture<ChangePassRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangePassRequestComponent]
    });
    fixture = TestBed.createComponent(ChangePassRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileFrontComponent } from './profile-front.component';

describe('ProfileFrontComponent', () => {
  let component: ProfileFrontComponent;
  let fixture: ComponentFixture<ProfileFrontComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileFrontComponent]
    });
    fixture = TestBed.createComponent(ProfileFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

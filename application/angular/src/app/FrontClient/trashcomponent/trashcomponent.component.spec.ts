import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrashcomponentComponent } from './trashcomponent.component';

describe('TrashcomponentComponent', () => {
  let component: TrashcomponentComponent;
  let fixture: ComponentFixture<TrashcomponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrashcomponentComponent]
    });
    fixture = TestBed.createComponent(TrashcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

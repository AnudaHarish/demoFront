import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveInfoComponent } from './leave-info.component';

describe('LeaveInfoComponent', () => {
  let component: LeaveInfoComponent;
  let fixture: ComponentFixture<LeaveInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeaveInfoComponent]
    });
    fixture = TestBed.createComponent(LeaveInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

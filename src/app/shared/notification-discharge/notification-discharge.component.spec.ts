import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationDischargeComponent } from './notification-discharge.component';

describe('NotificationDischargeComponent', () => {
  let component: NotificationDischargeComponent;
  let fixture: ComponentFixture<NotificationDischargeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationDischargeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationDischargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

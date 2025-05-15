/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UpdateDailyRollCallComponent } from './update-daily-roll-call.component';

describe('UpdateDailyRollCallComponent', () => {
  let component: UpdateDailyRollCallComponent;
  let fixture: ComponentFixture<UpdateDailyRollCallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateDailyRollCallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDailyRollCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendaceIndexComponent } from './attendace-index.component';

describe('AttendaceIndexComponent', () => {
  let component: AttendaceIndexComponent;
  let fixture: ComponentFixture<AttendaceIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendaceIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendaceIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

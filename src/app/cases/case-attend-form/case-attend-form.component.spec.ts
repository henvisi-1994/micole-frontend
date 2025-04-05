import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseAttendFormComponent } from './case-attend-form.component';

describe('CaseAttendFormComponent', () => {
  let component: CaseAttendFormComponent;
  let fixture: ComponentFixture<CaseAttendFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseAttendFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseAttendFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

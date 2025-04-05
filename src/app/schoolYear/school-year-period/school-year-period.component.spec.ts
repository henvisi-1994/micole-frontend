import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolYearPeriodComponent } from './school-year-period.component';

describe('SchoolYearPeriodComponent', () => {
  let component: SchoolYearPeriodComponent;
  let fixture: ComponentFixture<SchoolYearPeriodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolYearPeriodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolYearPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

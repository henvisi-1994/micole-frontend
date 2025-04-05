import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolYearCloseComponent } from './school-year-close.component';

describe('SchoolYearCloseComponent', () => {
  let component: SchoolYearCloseComponent;
  let fixture: ComponentFixture<SchoolYearCloseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolYearCloseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolYearCloseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

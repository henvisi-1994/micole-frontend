import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolYearCardComponent } from './school-year-card.component';

describe('SchoolYearCardComponent', () => {
  let component: SchoolYearCardComponent;
  let fixture: ComponentFixture<SchoolYearCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolYearCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolYearCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

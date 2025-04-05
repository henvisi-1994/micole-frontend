import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolPlanComponent } from './school-plan.component';

describe('SchoolPlanComponent', () => {
  let component: SchoolPlanComponent;
  let fixture: ComponentFixture<SchoolPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

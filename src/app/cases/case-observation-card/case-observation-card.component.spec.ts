import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseObservationCardComponent } from './case-observation-card.component';

describe('CaseObservationCardComponent', () => {
  let component: CaseObservationCardComponent;
  let fixture: ComponentFixture<CaseObservationCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseObservationCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseObservationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

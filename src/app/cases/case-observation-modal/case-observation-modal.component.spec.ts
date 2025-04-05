import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseObservationModalComponent } from './case-observation-modal.component';

describe('CaseObservationModalComponent', () => {
  let component: CaseObservationModalComponent;
  let fixture: ComponentFixture<CaseObservationModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseObservationModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseObservationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedemptionCardComponent } from './redemption-card.component';

describe('RedemptionCardComponent', () => {
  let component: RedemptionCardComponent;
  let fixture: ComponentFixture<RedemptionCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedemptionCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedemptionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

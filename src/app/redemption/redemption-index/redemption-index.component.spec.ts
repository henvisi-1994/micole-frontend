import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedemptionIndexComponent } from './redemption-index.component';

describe('RedemptionIndexComponent', () => {
  let component: RedemptionIndexComponent;
  let fixture: ComponentFixture<RedemptionIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedemptionIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedemptionIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

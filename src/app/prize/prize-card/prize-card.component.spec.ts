import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrizeCardComponent } from './prize-card.component';

describe('PrizeCardComponent', () => {
  let component: PrizeCardComponent;
  let fixture: ComponentFixture<PrizeCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrizeCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrizeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

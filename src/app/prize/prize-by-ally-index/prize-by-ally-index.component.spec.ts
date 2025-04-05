import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrizeByAllyIndexComponent } from './prize-by-ally-index.component';

describe('PrizeByAllyIndexComponent', () => {
  let component: PrizeByAllyIndexComponent;
  let fixture: ComponentFixture<PrizeByAllyIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrizeByAllyIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrizeByAllyIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

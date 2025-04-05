import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrizeSearchComponent } from './prize-search.component';

describe('PrizeSearchComponent', () => {
  let component: PrizeSearchComponent;
  let fixture: ComponentFixture<PrizeSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrizeSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrizeSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

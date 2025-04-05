import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrizeIndexComponent } from './prize-index.component';

describe('PrizeIndexComponent', () => {
  let component: PrizeIndexComponent;
  let fixture: ComponentFixture<PrizeIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrizeIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrizeIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

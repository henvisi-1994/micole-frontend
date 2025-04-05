import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FranchiseCardComponent } from './franchise-card.component';

describe('FranchiseCardComponent', () => {
  let component: FranchiseCardComponent;
  let fixture: ComponentFixture<FranchiseCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FranchiseCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FranchiseCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

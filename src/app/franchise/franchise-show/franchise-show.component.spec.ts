import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FranchiseShowComponent } from './franchise-show.component';

describe('FranchiseShowComponent', () => {
  let component: FranchiseShowComponent;
  let fixture: ComponentFixture<FranchiseShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FranchiseShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FranchiseShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

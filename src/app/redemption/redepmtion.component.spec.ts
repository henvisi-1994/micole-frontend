import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedepmtionComponent } from './redepmtion.component';

describe('RedepmtionComponent', () => {
  let component: RedepmtionComponent;
  let fixture: ComponentFixture<RedepmtionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedepmtionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedepmtionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

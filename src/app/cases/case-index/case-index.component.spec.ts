import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseIndexComponent } from './case-index.component';

describe('CaseIndexComponent', () => {
  let component: CaseIndexComponent;
  let fixture: ComponentFixture<CaseIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

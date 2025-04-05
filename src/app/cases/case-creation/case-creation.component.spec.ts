import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseCreationComponent } from './case-creation.component';

describe('CaseCreationComponent', () => {
  let component: CaseCreationComponent;
  let fixture: ComponentFixture<CaseCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

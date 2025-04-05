import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FranchiseModalFormComponent } from './franchise-modal-form.component';

describe('FranchiseModalFormComponent', () => {
  let component: FranchiseModalFormComponent;
  let fixture: ComponentFixture<FranchiseModalFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FranchiseModalFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FranchiseModalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

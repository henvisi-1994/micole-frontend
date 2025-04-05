import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociateParentMassiveComponent } from './associate-parent-massive.component';

describe('AssociateParentMassiveComponent', () => {
  let component: AssociateParentMassiveComponent;
  let fixture: ComponentFixture<AssociateParentMassiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssociateParentMassiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociateParentMassiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

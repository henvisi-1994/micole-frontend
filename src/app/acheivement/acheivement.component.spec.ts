import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcheivementComponent } from './acheivement.component';

describe('AcheivementComponent', () => {
  let component: AcheivementComponent;
  let fixture: ComponentFixture<AcheivementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcheivementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcheivementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

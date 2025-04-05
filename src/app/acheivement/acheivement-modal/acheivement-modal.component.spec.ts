import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcheivementModalComponent } from './acheivement-modal.component';

describe('AcheivementModalComponent', () => {
  let component: AcheivementModalComponent;
  let fixture: ComponentFixture<AcheivementModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcheivementModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcheivementModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

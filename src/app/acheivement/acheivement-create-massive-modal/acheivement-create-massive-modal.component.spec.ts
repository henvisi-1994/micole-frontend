import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcheivementCreateMassiveModalComponent } from './acheivement-create-massive-modal.component';

describe('AcheiementCreateMassiveModalComponent', () => {
  let component: AcheivementCreateMassiveModalComponent;
  let fixture: ComponentFixture<AcheivementCreateMassiveModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcheivementCreateMassiveModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcheivementCreateMassiveModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcheivementCopyModalComponent } from './acheivement-copy-modal.component';

describe('AcheivementCopyModalComponent', () => {
  let component: AcheivementCopyModalComponent;
  let fixture: ComponentFixture<AcheivementCopyModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcheivementCopyModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcheivementCopyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

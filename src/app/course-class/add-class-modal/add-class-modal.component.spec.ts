import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClassModalComponent } from './add-class-modal.component';

describe('AddClassModalComponent', () => {
  let component: AddClassModalComponent;
  let fixture: ComponentFixture<AddClassModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddClassModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddClassModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

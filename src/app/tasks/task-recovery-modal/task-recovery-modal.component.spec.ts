import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskRecoveryModalComponent } from './task-recovery-modal.component';

describe('TaskFinalModalComponent', () => {
  let component: TaskRecoveryModalComponent;
  let fixture: ComponentFixture<TaskRecoveryModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskRecoveryModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskRecoveryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskFinalModalComponent } from './task-final-modal.component';

describe('TaskFinalModalComponent', () => {
  let component: TaskFinalModalComponent;
  let fixture: ComponentFixture<TaskFinalModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskFinalModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskFinalModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

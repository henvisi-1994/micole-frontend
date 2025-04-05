import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskGradeComponent } from './task-grade.component';

describe('TaskGradeComponent', () => {
  let component: TaskGradeComponent;
  let fixture: ComponentFixture<TaskGradeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskGradeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskGradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

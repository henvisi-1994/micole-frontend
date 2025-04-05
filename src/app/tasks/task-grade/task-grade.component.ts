import { Score } from './../../../models/score/score.model';
import { showSuccess, hasError } from 'src/util/validators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-task-grade',
  templateUrl: './task-grade.component.html',
  styleUrls: ['./task-grade.component.sass']
})
export class TaskGradeComponent implements OnInit, OnChanges {
  @Input() modalTitle: string
  @Output() onGrade: EventEmitter<{value: number, feedback: string}> = new EventEmitter();
  gradeForm: FormGroup
  @Input() currentScore: Score

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.initForm()
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.gradeForm = new FormGroup({
      value: new FormControl(this.currentScore?.value || 0, [Validators.required, Validators.min(0)]),
      feedback: new FormControl(this.currentScore?.feedback || '')
    })
  }

  showSuccess(name: string): boolean {
    return showSuccess(this.gradeForm, name)
  }

  hasError(name: string, validation: string) {
    return hasError(this.gradeForm, name, validation)
  }

  onSubmit() {
    this.onGrade.emit(this.gradeForm.value);
  }

}

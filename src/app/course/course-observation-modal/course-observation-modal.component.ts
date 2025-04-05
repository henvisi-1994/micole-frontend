import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CourseObservationPeriod } from 'src/models/course/courseObservation.model';
import { hasError, showSuccess } from 'src/util/validators';

declare const $: any

@Component({
  selector: 'app-course-observation-modal',
  templateUrl: './course-observation-modal.component.html',
  styleUrls: ['./course-observation-modal.component.sass']
})
export class CourseObservationModalComponent implements OnInit, OnDestroy {
  modalForm: FormGroup;
  @Input() periods: CourseObservationPeriod[]
  @Output() onAction: EventEmitter<{ text: string; periodId: string }> =
    new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.modalForm = new FormGroup({
      text: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(2000),
      ]),
      periodId: new FormControl(this.periods[0].id, [
        Validators.required,
      ]),
    });
  }

  onSubmit() {
    $("#courseObservationModal").modal("hide");
    this.onAction.emit(this.modalForm.value);
    this.modalForm.reset();
    this.modalForm.setValue({
      text: "",
      periodId: this.periods[0].id,
    });
  }

  showSuccess(name: string): boolean {
    return showSuccess(this.modalForm, name);
  }

  hasError(name: string, validation: string) {
    return hasError(this.modalForm, name, validation);
  }

  ngOnDestroy(): void {
    $("#courseObservationModal").modal("hide");
    $('.modal-backdrop').remove();
    $('body').removeClass('modal-open');
  }

}

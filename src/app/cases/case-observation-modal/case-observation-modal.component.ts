import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { hasError, showSuccess } from 'src/util/validators';

declare const $: any


@Component({
  selector: 'app-case-observation-modal',
  templateUrl: './case-observation-modal.component.html',
  styleUrls: ['./case-observation-modal.component.sass']
})
export class CaseObservationModalComponent implements OnInit {
  modalForm: FormGroup;
  @Output() onAction: EventEmitter<{ text: string; }> =
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
    });
  }

  onSubmit() {
    $("#courseObservationModal").modal("hide");
    this.onAction.emit(this.modalForm.value);
    this.modalForm.reset();
  }

  showSuccess(name: string): boolean {
    return showSuccess(this.modalForm, name);
  }

  hasError(name: string, validation: string) {
    return hasError(this.modalForm, name, validation);
  }

  ngOnDestroy(): void {
    $("#caseObservationModal").modal("hide");
    $('.modal-backdrop').remove();
    $('body').removeClass('modal-open');
  }

}

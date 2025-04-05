import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { hasError, showSuccess } from "src/util/validators";

declare const $: any;

@Component({
  selector: "app-notification-private-modal",
  templateUrl: "./notification-modal.component.html",
  styleUrls: ["./notification-modal.component.sass"],
})
export class NotificationModalComponent implements OnInit, OnDestroy {
  modalForm: FormGroup;
  fileToUpload?: File
  @Output() onAction: EventEmitter<{ title: string; description: string, file?: File }> =
    new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.modalForm = new FormGroup({
      description: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
      ]),
      title: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
      ]),
      file: new FormControl(null)
    });
  }

  extensions() {
    return "image/jpeg,image/jpg,image/png,application/pdf,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  onSubmit() {
    $("#notificationModal").modal("hide");
    this.onAction.emit({...this.modalForm.value, file: this.fileToUpload});
    this.modalForm.reset();
    // this.fileToUpload = null
    this.modalForm.setValue({
      description: "",
      title: "",
      file: null
    });
  }

  showSuccess(name: string): boolean {
    return showSuccess(this.modalForm, name);
  }

  hasError(name: string, validation: string) {
    return hasError(this.modalForm, name, validation);
  }

  ngOnDestroy(): void {
    $("#notificationModal").modal("hide");
    $('.modal-backdrop').remove();
    $('body').removeClass('modal-open');
  }

}

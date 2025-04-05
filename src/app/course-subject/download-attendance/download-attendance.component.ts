import { FormGroup, FormControl, Validators } from "@angular/forms";
import {
  Component,
  EventEmitter,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";
import { month } from "src/models/parametric/month.model";
import { hasError, showSuccess } from "src/util/validators";

declare const $: any;

@Component({
  selector: "app-download-attendance",
  templateUrl: "./download-attendance.component.html",
  styleUrls: ["./download-attendance.component.sass"],
})
export class DownloadAttendanceComponent implements OnInit, OnDestroy {
  attendanceForm: FormGroup;
  @Output() onAction: EventEmitter<{ year: number; month: string }> =
    new EventEmitter();
  month = month;
  constructor() {}

  ngOnInit(): void {
    this.initForm();
  }

  monthValues() {
    return Object.keys(this.month);
  }

  showSuccess(name: string): boolean {
    return showSuccess(this.attendanceForm, name);
  }

  hasError(name: string, validation: string) {
    return hasError(this.attendanceForm, name, validation);
  }

  onSubmit() {
    $("#downloadAttendance").modal("hide");
    this.onAction.emit(this.attendanceForm.value);
  }

  ngOnDestroy(): void {
    $("#downloadAttendance").modal("hide");
    $('.modal-backdrop').remove();
    $('body').removeClass('modal-open');
  }

  private initForm() {
    this.attendanceForm = new FormGroup({
      year: new FormControl(new Date().getFullYear(), [Validators.required]),
      month: new FormControl(Object.keys(this.month)[0], [Validators.required]),
    });
  }
}

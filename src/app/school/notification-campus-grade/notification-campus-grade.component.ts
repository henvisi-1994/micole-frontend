import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NotificationForFranchiestGrade } from "src/models/notification/notificatioForFranchiestGrade.model";
import { NotificationService } from "src/services/notification/notification.service";
import { USER } from "src/util/constants";
import swal from "sweetalert2";

@Component({
  selector: "app-notification-campus-grade",
  templateUrl: "./notification-campus-grade.component.html",
  styleUrls: ["./notification-campus-grade.component.scss"],
})
export class NotificationCampusGradeComponent implements OnInit {
  notificationForm: FormGroup;
   userId = localStorage.getItem(USER) || '';

  severityOptions = [
    { value: "SLIGHT", label: "Baja" },
    { value: "MEDIUM", label: "Media" },
    { value: "SEVERE", label: "Alta" },
    { value: "CONGRATULATION", label: "Felicitaciones" },
    { value: "GENERAL", label: "General" },
  ];
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.notificationForm = this.fb.group({
      Description: ["", Validators.required],
      UserId: [this.userId, Validators.required],
      Severity: ["CONGRATULATION", Validators.required],
      ActionTaken: ["", Validators.required],
      CourseId: ["", Validators.required],
      GradeId: ["", Validators.required],
    });
  }

  onSubmit(): void {
    console.log(this.notificationForm.value);
    if (this.notificationForm.invalid) {
      this.markFormGroupTouched(this.notificationForm);
      return;
    }

    this.isSubmitting = true;
    const payload: NotificationForFranchiestGrade = this.notificationForm.value;
    this.notificationService
      .createNotificationForcourseGrade(payload)
      .subscribe((response) => {
        swal("Se agrego la notificación", "", "success");
        this.isSubmitting = false;
        this.notificationForm.reset();
      });
  }

  // Helper method to mark all controls as touched
  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  // Helper method to check if a field has an error
  hasError(controlName: string, errorName: string): boolean {
    const control = this.notificationForm.get(controlName);
    return control.touched && control.hasError(errorName);
  }
}

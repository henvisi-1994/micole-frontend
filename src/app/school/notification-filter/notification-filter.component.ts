import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationForFranchiestGrade } from 'src/models/notification/notificatioForFranchiestGrade.model';
import { NotificationService } from 'src/services/notification/notification.service';
interface Sede {
  id: number;
  nombre: string;
}

interface Grado {
  id: number;
  nombre: string;
  sedeId: number;
}

interface Notificacion {
  id: number;
  asunto: string;
  tipo: string;
  sede: string;
  grado: string | null;
  fecha: Date;
  estado: string;
}
@Component({
  selector: 'app-notification-filter',
  templateUrl: './notification-filter.component.html',
  styleUrls: ['./notification-filter.component.sass']
})
export class NotificationFilterComponent implements OnInit {

  notificationForm: FormGroup
  isLoading = false

  severityOptions = [
    { value: "CONGRATULATION", viewValue: "CONGRATULATION" },
    { value: "INFO", viewValue: "INFO" },
    { value: "WARNING", viewValue: "WARNING" },
    { value: "ERROR", viewValue: "ERROR" },
  ]

  actionOptions = [
    { value: "Action 1", viewValue: "Action 1" },
    { value: "Action 2", viewValue: "Action 2" },
    { value: "Action 3", viewValue: "Action 3" },
  ]

  constructor(
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.initForm()
  }

  initForm(): void {
    this.notificationForm = this.fb.group({
      Description: ["", Validators.required],
      UserId: ["", Validators.required],
      Severity: ["CONGRATULATION", Validators.required],
      ActionTaken: ["Action 1", Validators.required],
      CourseId: ["", Validators.required],
      GradeId: ["", Validators.required],
    })
  }

  onSubmit(): void {
    if (this.notificationForm.invalid) {
      return
    }

    this.isLoading = true
    const notificationData: NotificationForFranchiestGrade = this.notificationForm.value

    this.notificationService
      .createNotificationForcourseGrade(notificationData)
      .subscribe(
        (response) => {
          this.snackBar.open("Notificación enviada correctamente", "Cerrar", {
            duration: 3000,
            horizontalPosition: "center",
            verticalPosition: "bottom",
          })
          this.notificationForm.reset({
            Severity: "CONGRATULATION",
            ActionTaken: "Action 1",
          })
        },
        (error) => {
          this.snackBar.open("Error al enviar la notificación", "Cerrar", {
            duration: 3000,
            horizontalPosition: "center",
            verticalPosition: "bottom",
            panelClass: ["error-snackbar"],
          })
          console.error("Error:", error)
        },
      )
      .add(() => {
        this.isLoading = false
      })
  }
}

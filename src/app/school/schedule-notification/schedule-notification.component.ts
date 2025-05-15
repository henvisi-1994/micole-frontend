import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Notification } from "src/models/notification/notification.model";
import { NotificationService } from "src/services/notification/notification.service";
import { UserService } from "src/services/user/user.service";
import { SCHOOL } from "src/util/constants";
interface Teacher {
  id: string;
  name: string;
}

@Component({
  selector: 'app-schedule-notification',
  templateUrl: './schedule-notification.component.html',
  styleUrls: ['./schedule-notification.component.scss']
})
export class ScheduleNotificationComponent implements OnInit {

 programacionForm: FormGroup;
   teachers: Teacher[] = [];
   archivosSeleccionados: File[] = [];
   isLoadingTeachers = false;
   teacherError = '';

   constructor(
     private fb: FormBuilder,
     private userService: UserService,
     private notificationService: NotificationService
   ) {
     const now = new Date();
     const defaultSendTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

     this.programacionForm = this.fb.group({
       description: ['', [Validators.required, Validators.minLength(20)]],
       severity: ['medium', Validators.required],
       actionTaken: [''],
       studentDischargesDate: [null],
       parentDischargesDate: [null],
       teacher: [''],
       appointment: [null],
       sendDate: [now, Validators.required],
       sendTime: [defaultSendTime, Validators.required],
       notifyStudent: [true],
       notifyParent: [true],
       notifyTeacher: [false]
     });
   }

   ngOnInit(): void {
     this.cargarProfesores();
   }

   cargarProfesores(): void {
     this.isLoadingTeachers = true;
     this.teacherError = '';

     this.userService.getTeachers(1, 10, "", localStorage.getItem(SCHOOL))
       .subscribe({
         next: (response) => {
           // Adapta esta línea según la estructura de respuesta de tu API
           this.teachers = response.data.map((teacher: any) => ({
             id: teacher.id,
             name: `${teacher.fullName}`
           }));
           console.log('Profesores cargados bd :',response.data);
           console.log('Profesores cargados:', this.teachers);

           this.isLoadingTeachers = false;
         },
         error: (err) => {
           console.error('Error cargando profesores:', err);
           this.teacherError = 'No se pudieron cargar los profesores';
           this.isLoadingTeachers = false;
         }
       });
   }

   onFileSelected(event: Event): void {
     const input = event.target as HTMLInputElement;
     if (input?.files) {
       this.archivosSeleccionados = Array.from(input.files);
     }
   }

   onFilesDropped(files: FileList): void {
     this.archivosSeleccionados = Array.from(files);
   }

   eliminarArchivo(index: number): void {
     this.archivosSeleccionados.splice(index, 1);
   }

   cancelar(): void {
     this.programacionForm.reset();
     this.archivosSeleccionados = [];
   }

   programarNotificacion(): void {
     if (this.programacionForm.valid) {
       const formValue = this.programacionForm.value;

       const notification: Notification = {
         id: this.generateId(),
         description: formValue.description,
         studentDischarges: formValue.notifyStudent ? 'pendiente' : 'no aplica',
         actionTaken: formValue.actionTaken,
         date: this.formatDateTime(formValue.sendDate, formValue.sendTime),
         parentDischarges: formValue.notifyParent ? 'pendiente' : 'no aplica',
         studentDischargesDate: formValue.studentDischargesDate?.toISOString(),
         parentDischargesDate: formValue.parentDischargesDate?.toISOString(),
         teacher: formValue.teacher,
         severity: formValue.severity,
         appointment: formValue.appointment?.toISOString()
       };

       this.notificationService.createScheduledNotification(notification)
         .subscribe({
           next: (savedNotification) => {
             // Manejar archivos adjuntos si existen
             console.log("Notificación programada exitosamente");
          },
           error: (err) => {
             console.error("Error programando la notificación", err);
             // Mostrar mensaje de error al usuario
           }
         });
     }
   }

   private generateId(): string {
     return Math.random().toString(36).substr(2, 9);
   }

   private formatDateTime(date: Date, time: string): string {
     const [hours, minutes] = time.split(':');
     date.setHours(parseInt(hours, 10));
     date.setMinutes(parseInt(minutes, 10));
     return date.toISOString();
   }

}

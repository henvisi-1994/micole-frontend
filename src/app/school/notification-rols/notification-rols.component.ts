import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NotificationService } from "src/services/notification/notification.service";
import { ROLE, SCHOOL } from "src/util/constants";
interface Sede {
  id: number;
  nombre: string;
}

interface Grado {
  id: number;
  nombre: string;
}
@Component({
  selector: "app-notification-rols",
  templateUrl: "./notification-rols.component.html",
  styleUrls: ["./notification-rols.component.sass"],
})
export class NotificationRolsComponent implements OnInit {
  notificacionForm: FormGroup;
  sedes: Sede[] = [];
  grados: Grado[] = [];
  archivosSeleccionados: File[] = [];
  caracteresMaximos = 1000;
  caracteresRestantes = 1000;

  constructor(
    private fb: FormBuilder,
    private notificacionesService: NotificationService
  ) {}

  ngOnInit(): void {
    this.inicializarFormulario();

    // Observar cambios en el mensaje para actualizar contador de caracteres
    this.notificacionForm.get("mensaje")?.valueChanges.subscribe((value) => {
      this.caracteresRestantes =
        this.caracteresMaximos - (value ? value.length : 0);
    });
  }

  inicializarFormulario(): void {
    this.notificacionForm = this.fb.group({
      description: ["", [Validators.required, Validators.minLength(20)]],
      severity: ["medium", Validators.required],
      actionTaken: [""],
      rolProfesores: [false],
      rolPadres: [false],
      rolEstudiantes: [false],
    });
  }

  tieneRolesSeleccionados(): boolean {
    const {
      rolDirectivos,
      rolProfesores,
      rolCoordinadores,
      rolPadres,
      rolEstudiantes,
    } = this.notificacionForm.value;

    return (
      rolDirectivos ||
      rolProfesores ||
      rolCoordinadores ||
      rolPadres ||
      rolEstudiantes
    );
  }

  onFileSelected(event: any): void {
    const files = event.target.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        if (this.archivosSeleccionados.length < 5) {
          this.archivosSeleccionados.push(files[i]);
        } else {
          alert("Solo puede adjuntar hasta 5 archivos.");
          break;
        }
      }
    }
  }

  eliminarArchivo(index: number): void {
    this.archivosSeleccionados.splice(index, 1);
  }

  cancelar(): void {
    // Lógica para cancelar y volver atrás
    console.log("Notificación cancelada");
  }

  enviarNotificacion(): void {
    if (this.notificacionForm.valid && this.tieneRolesSeleccionados()) {
      const formValue = this.notificacionForm.value;

      const rolesMap = [
        { key: "rolProfesores", value: "Teacher" },
        { key: "rolPadres", value: "Parent" },
        { key: "rolEstudiantes", value: "Student" },
      ];

      rolesMap.forEach((role) => {
        if (formValue[role.key]) {
          const payload = {
            description: formValue.description,
            severity: formValue.severity,
            actionTaken: formValue.actionTaken,
            rol: role.value,
            school_id: localStorage.getItem(SCHOOL),
          };
          this.notificacionesService.createRoleNotification(payload).subscribe({
            next: () =>
              console.log("Notificación creada para rol:", payload.rol),
            error: (err) => console.error("Error:", err),
          });
        }
      });
    } else {
      // Marcar todos los campos como tocados para mostrar errores
      Object.keys(this.notificacionForm.controls).forEach((key) => {
        this.notificacionForm.get(key)?.markAsTouched();
      });
    }
  }
}

import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";import { Pagination } from "src/models/parametric/pagination.model";
import { Role } from "src/models/parametric/role.model";
import { ReferralReason } from "src/models/school/referralReason.model";
import { StudentReferral } from "src/models/school/studentReferral.model";
import { User } from "src/models/user/user.model";
import { StudentReferralService } from "src/services/student-referral/student-referral.service";
import { UserService } from "src/services/user/user.service";
import { SCHOOL } from "src/util/constants";
export interface ApiResponse<T> {
  pagination: Pagination;
  code: number;
  codeName: string;
  data: T[];
}
@Component({
  selector: 'app-student-referral',
  templateUrl: './student-referral.component.html',
  styleUrls: ['./student-referral.component.scss']
})
export class StudentReferralComponent implements OnInit {

   remisionForm: FormGroup
    estudiantes: User[] = []
    studentsReferals: ApiResponse<any>[] = [];

    page = 1;
    limit = 10;
    hasMore = true;
    isLoading = false;
     title: string = ' Remisión a Orientación';
     subtitle: string = 'Remision de estudiantes';
      headers = [
        'Estudiante',
        'Fecha Remision',
        'Remitido por',
        'Descripcion',
        'Acciones'
      ];

      keys = [
        'studentId',
        'referralDate',
        'ReferredBy',
        'detailedDescription',
        'previousActions',
      ];

      pagination: Pagination = {
        currentPage: 1,
        itemPerPage: 5,
        totalItems: 0,
        totalPages: 0,
      };

    constructor(private fb: FormBuilder,  private referralService: StudentReferralService,    private userService: UserService,
    ) {
      this.remisionForm = this.fb.group({
        estudiante: ["", Validators.required],
        fecha: [new Date().toISOString().split("T")[0], Validators.required],
        remitente: ["", Validators.required],
        tipoRemision: ["", Validators.required],
        motivoBajoRendimiento: [false],
        motivoInasistencia: [false],
        motivoComportamiento: [false],
        motivoAtencion: [false],
        motivoEmocional: [false],
        motivoFamiliar: [false],
        motivoSalud: [false],
        motivoOtro: [false],
        otroMotivoTexto: [""],
        descripcion: ["", [Validators.required, Validators.minLength(50)]],
        accionesPrevias: [""],
      })
    }

    ngOnInit(): void {
      this.cargarEstudiantes()
      this.cargarStudenReferals()
      // Observar cambios en el campo motivoOtro
      this.remisionForm.get("motivoOtro")?.valueChanges.subscribe((value) => {
        if (value) {
          this.remisionForm.get("otroMotivoTexto")?.setValidators([Validators.required])
        } else {
          this.remisionForm.get("otroMotivoTexto")?.clearValidators()
        }
        this.remisionForm.get("otroMotivoTexto")?.updateValueAndValidity()
      })
    }

    onSelectOpened(): void {
      this.attachScrollListener();
      if (this.estudiantes.length === 0) {
        this.cargarEstudiantes();
      }
    }
    attachScrollListener(): void {
      setTimeout(() => {
        const panel = document.querySelector('.mat-select-panel');
        if (panel) {
          panel.addEventListener('scroll', () => {
            const threshold = 150;
            const position = panel.scrollTop + panel.clientHeight;
            const height = panel.scrollHeight;

            if (position > height - threshold && !this.isLoading && this.hasMore) {
              this.cargarEstudiantes();
            }
          });
        }
      }, 100); // Espera a que el panel se renderice
    }
    cargarEstudiantes(): void {
      this.isLoading = true;
      const schoolId = localStorage.getItem(SCHOOL);

      this.userService.getStudentsByPagination(this.page, this.limit, "", schoolId)
        .subscribe((response) => {
          const data = response.data || [];
          if (data.length > 0) {
            this.estudiantes.push(...data);
            this.page++;
          } else {
            this.hasMore = false;
          }
          this.isLoading = false;
        });
    }
cargarStudenReferals(): void {
  this.referralService.getReferralsByPagination(1, 10).subscribe({
    next: (response) => {
      this.studentsReferals = response.data;
      this.pagination = {
        currentPage: response.pagination.currentPage,
        itemPerPage: response.pagination.itemPerPage,
        totalItems: response.pagination.totalItems,
        totalPages: response.pagination.totalPages,
      };
    },
    error: (err) => {
      console.error(err);  // Maneja el error
    },
  });
}
    tieneMotivosSeleccionados(): boolean {
      const {
        motivoBajoRendimiento,
        motivoInasistencia,
        motivoComportamiento,
        motivoAtencion,
        motivoEmocional,
        motivoFamiliar,
        motivoSalud,
        motivoOtro,
      } = this.remisionForm.value

      return (
        motivoBajoRendimiento ||
        motivoInasistencia ||
        motivoComportamiento ||
        motivoAtencion ||
        motivoEmocional ||
        motivoFamiliar ||
        motivoSalud ||
        motivoOtro
      )
    }

    cancelar(): void {
      // Lógica para cancelar y volver atrás
      console.log("Remisión cancelada")
    }

    enviarRemision(): void {
      if (this.remisionForm.valid && this.tieneMotivosSeleccionados()) {
        const formValue = this.remisionForm.value;

        // Construir lista de motivos seleccionados
        const motivos: ReferralReason[] = [];

        if (formValue.motivoBajoRendimiento) motivos.push({ code: "LOW_PERFORMANCE", description: "Low academic performance" });
        if (formValue.motivoInasistencia) motivos.push({ code: "FREQUENT_ABSENCES", description: "Frequent absences" });
        if (formValue.motivoComportamiento) motivos.push({ code: "BEHAVIOR_ISSUES", description: "Behavioral issues" });
        if (formValue.motivoAtencion) motivos.push({ code: "ATTENTION_DIFFICULTIES", description: "Attention difficulties" });
        if (formValue.motivoEmocional) motivos.push({ code: "EMOTIONAL_PROBLEMS", description: "Emotional problems" });
        if (formValue.motivoFamiliar) motivos.push({ code: "FAMILY_ISSUES", description: "Family issues" });
        if (formValue.motivoSalud) motivos.push({ code: "HEALTH_ISSUES", description: "Health problems" });
        if (formValue.motivoOtro && formValue.otroMotivoTexto) {
          motivos.push({ code: "OTHER", description: formValue.otroMotivoTexto });
        }

        const remision: StudentReferral = {
          studentId: formValue.estudiante, // Asegúrate de que sea el `id`
          referredBy: formValue.remitente,
          referralDate: formValue.fecha,
          referralType: formValue.tipoRemision,
          reasons: motivos,
          detailedDescription: formValue.descripcion,
          previousActions: formValue.accionesPrevias,
          supportingDocuments: [] // Agrega lógica si usas archivos
        };

        this.referralService.createReferral(remision).subscribe({
          next: () => {
            alert("Remisión enviada correctamente");
            this.remisionForm.reset(); // limpiar formulario si deseas
          },
          error: (err) => {
            alert("Ocurrió un error al enviar la remisión.");
            console.error(err);
          }
        });
      } else {
        Object.keys(this.remisionForm.controls).forEach((key) => {
          this.remisionForm.get(key)?.markAsTouched();
        });
      }
    }


}

import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";import { ReferralReason } from "src/models/school/referralReason.model";
import { StudentReferral } from "src/models/school/studentReferral.model";
import { StudentReferralService } from "src/services/student-referral/student-referral.service";
interface Estudiante {
  id: number
  nombre: string
  grado: string
}
@Component({
  selector: 'app-student-referral',
  templateUrl: './student-referral.component.html',
  styleUrls: ['./student-referral.component.scss']
})
export class StudentReferralComponent implements OnInit {

   remisionForm: FormGroup
    estudiantes: Estudiante[] = []

    constructor(private fb: FormBuilder,  private referralService: StudentReferralService) {
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


    cargarEstudiantes(): void {
      // Simulación de carga de estudiantes desde API
      this.estudiantes = [
        { id: 1, nombre: "Ana María Gómez", grado: "5°A" },
        { id: 2, nombre: "Carlos Rodríguez", grado: "5°A" },
        { id: 3, nombre: "Laura Martínez", grado: "5°A" },
        { id: 4, nombre: "Juan Pablo Pérez", grado: "5°A" },
        { id: 5, nombre: "Sofía Ramírez", grado: "4°B" },
        { id: 6, nombre: "Daniel Torres", grado: "4°B" },
      ]
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

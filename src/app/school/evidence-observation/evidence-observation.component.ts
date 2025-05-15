import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
interface Estudiante {
  id: number
  nombre: string
}
@Component({
  selector: 'app-evidence-observation',
  templateUrl: './evidence-observation.component.html',
  styleUrls: ['./evidence-observation.component.sass']
})
export class EvidenceObservationComponent implements OnInit {

    observacionForm: FormGroup
    archivosSeleccionados: File[] = []
    estudiantes: Estudiante[] = []

    constructor(private fb: FormBuilder) {
      this.observacionForm = this.fb.group({
        estudiante: ["", Validators.required],
        tipo: ["academica", Validators.required],
        fecha: [new Date().toISOString().split("T")[0], Validators.required],
        descripcion: ["", [Validators.required, Validators.minLength(10)]],
        verDirectivos: [true],
        verProfesores: [true],
        verPadres: [false],
        verEstudiante: [false],
      })
    }

    ngOnInit(): void {
      this.cargarEstudiantes()
    }

    cargarEstudiantes(): void {
      // Aquí podrías reemplazar estos datos con una llamada a un servicio que obtenga los estudiantes desde un backend
      this.estudiantes = [
        { id: 1, nombre: "Ana María Gómez - 5°A" },
        { id: 2, nombre: "Carlos Rodríguez - 5°A" },
        { id: 3, nombre: "Laura Martínez - 5°A" },
        { id: 4, nombre: "Juan Pablo Pérez - 5°A" },
      ]
    }

    onFileSelected(event: Event): void {
      const input = event.target as HTMLInputElement; // Hacemos un cast a HTMLInputElement
      const files = input?.files; // Accedemos a 'files' si existe

      if (files) {
        Array.from(files).forEach((file) => {
          this.archivosSeleccionados.push(file);
        });
      }
    }

    eliminarArchivo(index: number): void {
      this.archivosSeleccionados.splice(index, 1)
    }

    tienePermisosSeleccionados(): boolean {
      const { verDirectivos, verProfesores, verPadres, verEstudiante } = this.observacionForm.value
      return verDirectivos || verProfesores || verPadres || verEstudiante
    }

    guardarObservacion(): void {
      if (this.observacionForm.valid && this.tienePermisosSeleccionados()) {
        const formData = new FormData()

        // Agregar datos del formulario
        Object.keys(this.observacionForm.value).forEach((key) => {
          formData.append(key, this.observacionForm.value[key])
        })

        // Agregar archivos
        this.archivosSeleccionados.forEach((archivo, index) => {
          formData.append(`archivo_${index}`, archivo, archivo.name)
        })

        console.log("Guardando observación con evidencias:", formData)
        // Aquí iría la llamada al servicio para guardar los datos
      }
    }

}

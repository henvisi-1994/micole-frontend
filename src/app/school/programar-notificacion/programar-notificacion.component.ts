import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule, Validators } from "@angular/forms";

interface Sede {
  id: number;
  nombre: string;
}

interface Grado {
  id: number;
  nombre: string;
}

@Component({
  selector: "app-programar-notificacion",
  templateUrl: "./programar-notificacion.component.html",
  styleUrls: ["./programar-notificacion.component.scss"],
})
export class ProgramarNotificacionComponent implements OnInit {
  programacionForm: FormGroup;
  sedes: Sede[] = [];
  grados: Grado[] = [];
  archivosSeleccionados: File[] = [];
  caracteresMaximos = 1000;
  caracteresRestantes = 1000;

  constructor(private fb: FormBuilder) {
    const manana = new Date();
    manana.setDate(manana.getDate() + 1);
    this.programacionForm = this.fb.group({
      asunto: ["", Validators.required],
      mensaje: ["", [Validators.required, Validators.minLength(10)]],
      rolDirectivos: [false],
      rolProfesores: [false],
      rolCoordinadores: [false],
      rolPadres: [false],
      rolEstudiantes: [false],
      sede: [""],
      grado: [""],
      fechaEnvio: [manana.toISOString().split("T")[0], Validators.required],
      horaEnvio: ["08:00", Validators.required],
      tipoRepeticion: ["ninguna"],
      lunes: [false],
      martes: [false],
      miercoles: [false],
      jueves: [false],
      viernes: [false],
      fechaFinRepeticion: [""],
    });
  }

  ngOnInit(): void {
    this.cargarSedes();
    this.cargarGrados();

    // Observar cambios en el campo 'mensaje' para actualizar el contador de caracteres restantes
    this.programacionForm.get('mensaje')?.valueChanges.subscribe((value: string) => {
      this.caracteresRestantes = this.caracteresMaximos - value.length;
    });
  }

  cargarSedes(): void {
    // Simular la carga de sedes (esto debería venir de un servicio)
    this.sedes = [
      { id: 1, nombre: "Sede A" },
      { id: 2, nombre: "Sede B" },
      { id: 3, nombre: "Sede C" },
    ];
  }

  cargarGrados(): void {
    // Simular la carga de grados (esto debería venir de un servicio)
    this.grados = [
      { id: 1, nombre: "Grado 1" },
      { id: 2, nombre: "Grado 2" },
      { id: 3, nombre: "Grado 3" },
    ];
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files) {
      const files = Array.from(input.files);
      this.archivosSeleccionados.push(...files);
    }
  }

  eliminarArchivo(index: number): void {
    this.archivosSeleccionados.splice(index, 1);
  }

  cancelar(): void {
    // Limpiar el formulario y las selecciones
    this.programacionForm.reset();
    this.archivosSeleccionados = [];
  }

  programarNotificacion(): void {
    if (this.programacionForm.valid) {
      console.log("Notificación programada:", this.programacionForm.value);
      // Aquí iría el código para guardar la programación
    }
  }

  tieneRolesSeleccionados(): boolean {
    return (
      this.programacionForm.get("rolDirectivos")?.value ||
      this.programacionForm.get("rolProfesores")?.value ||
      this.programacionForm.get("rolCoordinadores")?.value ||
      this.programacionForm.get("rolPadres")?.value ||
      this.programacionForm.get("rolEstudiantes")?.value
    );
  }
}

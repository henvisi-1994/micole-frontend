import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
interface Materia {
  id: number;
  nombre: string;
}

interface Grado {
  id: number;
  nombre: string;
}

interface Asistencia {
  id: number;
  estudiante: string;
  estado: string;
  observaciones: string;
  evidencia?: string;
  evidenciaNombre?: string;
  evidenciaArchivo?: File;
}
@Component({
  selector: 'app-editable-attendance-list',
  templateUrl: './editable-attendance-list.component.html',
  styleUrls: ['./editable-attendance-list.component.sass']
})
export class EditableAttendanceListComponent implements OnInit {

  materias: Materia[] = [];
    grados: Grado[] = [];
    asistencias: Asistencia[] = [];

    fechaSeleccionada: string = new Date().toISOString().split("T")[0];
    materiaSeleccionada: number | null = null;
    gradoSeleccionado: number | null = null;

    estadoLlamado = "Borrador";
    modoEdicion = false;
    notaGeneral = "";
    intentoCargar = false;

    // Variables para el modal de evidencia
    estudianteSeleccionado = "";
    estadoSeleccionado = "";
    observacionesSeleccionadas = "";
    urlEvidencia: SafeResourceUrl | null = null;
    tipoEvidencia = "";
    materiaSeleccionadaNombre = "";
    gradoSeleccionadoNombre = "";

    constructor(private sanitizer: DomSanitizer) {
      // El sanitizer ya está inyectado y listo para usar
    }

    ngOnInit(): void {
      this.cargarMaterias();
      this.cargarGrados();
    }

    cargarMaterias(): void {
      // Simulación de carga de materias desde API
      this.materias = [
        { id: 1, nombre: "Matemáticas" },
        { id: 2, nombre: "Español" },
        { id: 3, nombre: "Ciencias Naturales" },
        { id: 4, nombre: "Ciencias Sociales" },
      ];
    }

    cargarGrados(): void {
      // Simulación de carga de grados desde API
      this.grados = [
        { id: 1, nombre: "Transición" },
        { id: 2, nombre: "Primero" },
        { id: 3, nombre: "Segundo" },
        { id: 4, nombre: "Tercero" },
      ];
    }

    puedeCargarAsistencia(): boolean {
      return !!this.fechaSeleccionada && !!this.materiaSeleccionada && !!this.gradoSeleccionado;
    }

    cargarAsistencia(): void {
      if (!this.puedeCargarAsistencia()) return;

      this.intentoCargar = true;

      // Simulación de carga de asistencia desde API
      this.asistencias = [
        {
          id: 1,
          estudiante: "Ana María Gómez",
          estado: "presente",
          observaciones: "",
        },
        {
          id: 2,
          estudiante: "Carlos Rodríguez",
          estado: "ausente",
          observaciones: "No asistió a clase sin justificación previa.",
        },
        {
          id: 3,
          estudiante: "Laura Martínez",
          estado: "tardanza",
          observaciones: "Llegó 15 minutos tarde.",
        },
        {
          id: 4,
          estudiante: "Juan Pablo Pérez",
          estado: "excusa",
          observaciones: "Presentó excusa médica.",
          evidencia: "https://ejemplo.com/excusa.pdf",
          evidenciaNombre: "excusa_medica.pdf",
        },
        {
          id: 5,
          estudiante: "Sofía Ramírez",
          estado: "presente",
          observaciones: "",
        },
      ];

      // Obtener nombres para el modal
      if (this.materiaSeleccionada) {
        const materia = this.materias.find((m) => m.id === this.materiaSeleccionada);
        this.materiaSeleccionadaNombre = materia ? materia.nombre : "";
      }

      if (this.gradoSeleccionado) {
        const grado = this.grados.find((g) => g.id === this.gradoSeleccionado);
        this.gradoSeleccionadoNombre = grado ? grado.nombre : "";
      }
    }

    habilitarEdicion(): void {
      this.modoEdicion = true;
    }

    cancelarEdicion(): void {
      this.modoEdicion = false;
      this.cargarAsistencia(); // Recargar datos originales
    }

    guardarCambios(): void {
      // Lógica para guardar los cambios
      console.log("Guardando cambios en asistencia:", {
        fecha: this.fechaSeleccionada,
        materia: this.materiaSeleccionada,
        grado: this.gradoSeleccionado,
        asistencias: this.asistencias,
        notaGeneral: this.notaGeneral,
      });

      // Aquí iría la llamada al servicio para guardar los cambios

      // Desactivar modo edición
      this.modoEdicion = false;

      // Mostrar mensaje de éxito
      alert("Cambios guardados correctamente");
    }

    finalizarLlamado(): void {
      // Lógica para finalizar el llamado a lista
      this.estadoLlamado = "Finalizado";

      // Aquí iría la llamada al servicio para finalizar el llamado

      // Mostrar mensaje de éxito
      alert("Llamado a lista finalizado correctamente");
    }

    onFileSelected(event: any, index: number): void {
      const files = event.target.files;
      if (files && files.length > 0) {
        const file = files[0];
        this.asistencias[index].evidenciaArchivo = file;
        this.asistencias[index].evidenciaNombre = file.name;
      }
    }

    verEvidencia(asistencia: Asistencia): void {
      this.estudianteSeleccionado = asistencia.estudiante;
      this.estadoSeleccionado = this.getEstadoTexto(asistencia.estado);
      this.observacionesSeleccionadas = asistencia.observaciones;

      // Determinar tipo de evidencia basado en la extensión
      if (asistencia.evidencia) {
        const extension = asistencia.evidencia.split(".").pop()?.toLowerCase();

        if (extension === "jpg" || extension === "jpeg" || extension === "png" || extension === "gif") {
          this.tipoEvidencia = "imagen";
        } else if (extension === "pdf") {
          this.tipoEvidencia = "pdf";
        } else {
          this.tipoEvidencia = "otro";
        }

        this.urlEvidencia = this.sanitizer.bypassSecurityTrustResourceUrl(asistencia.evidencia);
      }

      // Abrir modal (en una implementación real se usaría jQuery o similar)
      // $('#evidenciaModal').modal('show');
    }

    descargarEvidencia(): void {
      // Lógica para descargar la evidencia
      console.log("Descargando evidencia");
    }

    getEstadoTexto(estado: string): string {
      switch (estado) {
        case "presente":
          return "Presente";
        case "ausente":
          return "Ausente";
        case "tardanza":
          return "Tardanza";
        case "excusa":
          return "Excusa";
        default:
          return estado;
      }
    }

    getEstadoBadgeClass(): string {
      switch (this.estadoLlamado) {
        case "Borrador":
          return "badge-warning";
        case "Finalizado":
          return "badge-success";
        default:
          return "badge-secondary";
      }
    }


}

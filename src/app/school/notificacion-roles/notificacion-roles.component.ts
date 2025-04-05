import { Component,  OnInit } from "@angular/core"
import {  FormBuilder,  FormGroup, Validators } from "@angular/forms"

interface Sede {
  id: number
  nombre: string
}

interface Grado {
  id: number
  nombre: string
}

@Component({
  selector: "app-notificacion-roles",
  templateUrl: "./notificacion-roles.component.html",
  styleUrls: ["./notificacion-roles.component.scss"],
})
export class NotificacionRolesComponent implements OnInit {
  notificacionForm: FormGroup
  sedes: Sede[] = []
  grados: Grado[] = []
  archivosSeleccionados: File[] = []
  caracteresMaximos = 1000
  caracteresRestantes = 1000

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.inicializarFormulario()
    this.cargarSedes()
    this.cargarGrados()

    // Observar cambios en el mensaje para actualizar contador de caracteres
    this.notificacionForm.get("mensaje")?.valueChanges.subscribe((value) => {
      this.caracteresRestantes = this.caracteresMaximos - (value ? value.length : 0)
    })
  }

  inicializarFormulario(): void {
    this.notificacionForm = this.fb.group({
      asunto: ["", Validators.required],
      mensaje: ["", [Validators.required, Validators.minLength(10)]],
      rolDirectivos: [false],
      rolProfesores: [false],
      rolCoordinadores: [false],
      rolPadres: [false],
      rolEstudiantes: [false],
      sede: [""],
      grado: [""],
      enviarEmail: [true],
      requiereConfirmacion: [false],
      notificacionPrioritaria: [false],
    })
  }

  cargarSedes(): void {
    // Simulación de carga de sedes desde API
    this.sedes = [
      { id: 1, nombre: "Principal" },
      { id: 2, nombre: "Sede B" },
    ]
  }

  cargarGrados(): void {
    // Simulación de carga de grados desde API
    this.grados = [
      { id: 1, nombre: "Transición" },
      { id: 2, nombre: "Primero" },
      { id: 3, nombre: "Segundo" },
      { id: 4, nombre: "Tercero" },
      { id: 5, nombre: "Cuarto" },
      { id: 6, nombre: "Quinto" },
    ]
  }

  tieneRolesSeleccionados(): boolean {
    const { rolDirectivos, rolProfesores, rolCoordinadores, rolPadres, rolEstudiantes } = this.notificacionForm.value

    return rolDirectivos || rolProfesores || rolCoordinadores || rolPadres || rolEstudiantes
  }

  onFileSelected(event: any): void {
    const files = event.target.files
    if (files) {
      for (let i = 0; i < files.length; i++) {
        if (this.archivosSeleccionados.length < 5) {
          this.archivosSeleccionados.push(files[i])
        } else {
          alert("Solo puede adjuntar hasta 5 archivos.")
          break
        }
      }
    }
  }

  eliminarArchivo(index: number): void {
    this.archivosSeleccionados.splice(index, 1)
  }

  cancelar(): void {
    // Lógica para cancelar y volver atrás
    console.log("Notificación cancelada")
  }

  enviarNotificacion(): void {
    if (this.notificacionForm.valid && this.tieneRolesSeleccionados()) {
      // Preparar datos para enviar
      const formData = new FormData()

      // Agregar datos del formulario
      Object.keys(this.notificacionForm.value).forEach((key) => {
        formData.append(key, this.notificacionForm.value[key])
      })

      // Agregar archivos
      this.archivosSeleccionados.forEach((archivo, index) => {
        formData.append(`archivo_${index}`, archivo, archivo.name)
      })

      // Lógica para enviar la notificación
      console.log("Enviando notificación:", this.notificacionForm.value)
      console.log("Archivos adjuntos:", this.archivosSeleccionados)

      // Aquí iría la llamada al servicio para enviar la notificación

      // Mostrar mensaje de éxito
      alert("Notificación enviada correctamente")
    } else {
      // Marcar todos los campos como tocados para mostrar errores
      Object.keys(this.notificacionForm.controls).forEach((key) => {
        this.notificacionForm.get(key)?.markAsTouched()
      })
    }
  }
}

import { CommonModule } from '@angular/common';
import { Component,  OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
interface AnioLectivo {
  id: number;
  nombre: string;
}

interface Sede {
  id: number;
  nombre: string;
}

interface Periodo {
  id: number;
  numero: number;
  nombrePredeterminado: string;
  nombrePersonalizado: string;
  fechaInicio: Date;
  fechaFin: Date;
  error?: string;
}

@Component({
  selector: 'app-renombrar-periodos',
  templateUrl: './renombrar-periodos.component.html',
  styleUrls: ['./renombrar-periodos.component.scss'],
})
export class RenombrarPeriodosComponent implements OnInit {
  aniosLectivos: AnioLectivo[] = [];
  sedes: Sede[] = [];
  periodos: Periodo[] = [];

  anioLectivoSeleccionado = 0;
  sedeSeleccionada = 'todas';
  aplicarATodas = false;

  constructor() {}

  ngOnInit(): void {
    this.cargarAniosLectivos();
    this.cargarSedes();
  }

  cargarAniosLectivos(): void {
    // Simulación de carga de años lectivos desde API
    this.aniosLectivos = [
      { id: 1, nombre: '2024' },
      { id: 2, nombre: '2023' },
      { id: 3, nombre: '2022' },
    ];

    // Seleccionar el año actual por defecto
    this.anioLectivoSeleccionado = this.aniosLectivos[0].id;
  }

  cargarSedes(): void {
    // Simulación de carga de sedes desde API
    this.sedes = [
      { id: 1, nombre: 'Principal' },
      { id: 2, nombre: 'Sede B' },
    ];
  }

  cargarPeriodos(): void {
    // Simulación de carga de períodos desde API
    this.periodos = [
      {
        id: 1,
        numero: 1,
        nombrePredeterminado: 'Primer Periodo',
        nombrePersonalizado: 'Primer Periodo',
        fechaInicio: new Date('2024-01-15'),
        fechaFin: new Date('2024-03-15'),
      },
      {
        id: 2,
        numero: 2,
        nombrePredeterminado: 'Segundo Periodo',
        nombrePersonalizado: 'Segundo Periodo',
        fechaInicio: new Date('2024-03-16'),
        fechaFin: new Date('2024-06-15'),
      },
      {
        id: 3,
        numero: 3,
        nombrePredeterminado: 'Tercer Periodo',
        nombrePersonalizado: 'Tercer Periodo',
        fechaInicio: new Date('2024-07-15'),
        fechaFin: new Date('2024-09-15'),
      },
      {
        id: 4,
        numero: 4,
        nombrePredeterminado: 'Cuarto Periodo',
        nombrePersonalizado: 'Cuarto Periodo',
        fechaInicio: new Date('2024-09-16'),
        fechaFin: new Date('2024-11-30'),
      },
    ];
  }

  validarNombrePeriodo(periodo: Periodo): void {
    if (!periodo.nombrePersonalizado.trim()) {
      periodo.error = 'El nombre del período no puede estar vacío';
      return;
    }

    // Validación de unicidad insensible a mayúsculas/minúsculas
    const nombresDuplicados = this.periodos.some(
      (p) =>
        p.id !== periodo.id &&
        p.nombrePersonalizado.trim().toLowerCase() ===
          periodo.nombrePersonalizado.trim().toLowerCase()
    );

    if (nombresDuplicados) {
      periodo.error = 'El nombre del período debe ser único';
      return;
    }

    periodo.error = undefined;
  }

  restaurarNombrePredeterminado(index: number): void {
    this.periodos[index].nombrePersonalizado = this.periodos[index].nombrePredeterminado;
    this.periodos[index].error = undefined;
  }

  puedeGuardar(): boolean {
    // Verificar si hay algún período con error
    return !this.periodos.some((periodo) => !!periodo.error);
  }

  cancelar(): void {
    // Lógica para cancelar y volver atrás
    console.log('Cambios cancelados');
  }

  guardarCambios(): void {
    if (this.puedeGuardar()) {
      // Lógica para guardar los cambios
      console.log('Guardando cambios en períodos:', {
        periodos: this.periodos,
        aplicarATodas: this.aplicarATodas,
      });

      // Aquí iría la llamada al servicio para guardar los cambios
      // Mostrar mensaje de éxito
      alert('Cambios guardados correctamente');
    }
  }
}

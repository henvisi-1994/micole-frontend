import { Component, OnInit } from '@angular/core';

interface Grado {
  id: number;
  nombre: string;
}

interface Materia {
  id: number;
  nombre: string;
  profesor: string;
  intensidadHoraria: number;
  activa: boolean;
  excluida: boolean;
}

@Component({
  selector: 'app-exclusion-materias',
  templateUrl: './exclusion-materias.component.html',
  styleUrls: ['./exclusion-materias.component.scss']
})
export class ExclusionMateriasComponent implements OnInit {
  grados: Grado[] = [];
  materias: Materia[] = [];
  gradoSeleccionado: number | null = null;
  periodoSeleccionado = 1;

  ngOnInit(): void {
    this.cargarGrados();
  }

  cargarGrados(): void {
    this.grados = [
      { id: 1, nombre: 'Transición' },
      { id: 2, nombre: 'Primero' },
      { id: 3, nombre: 'Segundo' },
      { id: 4, nombre: 'Tercero' },
      { id: 5, nombre: 'Cuarto' },
      { id: 6, nombre: 'Quinto' }
    ];
  }

  cargarMaterias(): void {
    if (!this.gradoSeleccionado) return;

    this.materias = [
      { id: 1, nombre: 'Matemáticas', profesor: 'Juan Pérez', intensidadHoraria: 5, activa: true, excluida: false },
      { id: 2, nombre: 'Español', profesor: 'María Rodríguez', intensidadHoraria: 4, activa: true, excluida: false },
      { id: 3, nombre: 'Ciencias Naturales', profesor: 'Carlos Gómez', intensidadHoraria: 3, activa: true, excluida: false },
      { id: 4, nombre: 'Ciencias Sociales', profesor: 'Ana Martínez', intensidadHoraria: 3, activa: true, excluida: false },
      { id: 5, nombre: 'Educación Física', profesor: 'Pedro Sánchez', intensidadHoraria: 2, activa: true, excluida: true },
      { id: 6, nombre: 'Artes', profesor: 'Laura Torres', intensidadHoraria: 2, activa: true, excluida: true },
      { id: 7, nombre: 'Ética y Valores', profesor: 'Roberto Díaz', intensidadHoraria: 1, activa: true, excluida: false }
    ];
  }

  get materiasExcluidas(): Materia[] {
    return this.materias.filter((materia) => materia.excluida);
  }

  actualizarExclusion(materia: Materia): void {
    console.log(`Materia ${materia.nombre} ${materia.excluida ? 'excluida' : 'incluida'} del cálculo`);
  }

  incluirMateria(materia: Materia): void {
    materia.excluida = false;
    this.actualizarExclusion(materia);
  }

  guardarConfiguracion(): void {
    console.log('Configuración guardada:', {
      grado: this.gradoSeleccionado,
      periodo: this.periodoSeleccionado,
      materiasExcluidas: this.materiasExcluidas.map((m) => m.id)
    });
    alert('Configuración guardada correctamente');
  }
}

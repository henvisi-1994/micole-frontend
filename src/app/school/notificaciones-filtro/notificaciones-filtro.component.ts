import { Component, OnInit } from '@angular/core';

interface Sede {
  id: number;
  nombre: string;
}

interface Grado {
  id: number;
  nombre: string;
  sedeId: number;
}

interface Notificacion {
  id: number;
  asunto: string;
  tipo: string;
  sede: string;
  grado: string | null;
  fecha: Date;
  estado: string;
}

@Component({
  selector: 'app-notificaciones-filtro',
  templateUrl: './notificaciones-filtro.component.html',
  styleUrls: ['./notificaciones-filtro.component.scss'],
})
export class NotificacionesFiltroComponent implements OnInit {
  sedes: Sede[] = [];
  grados: Grado[] = [];
  notificaciones: Notificacion[] = [];

  sedeSeleccionada: number | null = null;
  gradoSeleccionado: number | null = null;
  tipoSeleccionado = '';
  estadoSeleccionado = '';

  constructor() {}

  ngOnInit(): void {
    this.cargarSedes();
    this.cargarNotificaciones();
  }

  cargarSedes(): void {
    // Simulación de carga de sedes desde API
    this.sedes = [
      { id: 1, nombre: 'Principal' },
      { id: 2, nombre: 'Sede B' },
    ];
  }

  cargarGrados(): void {
    if (!this.sedeSeleccionada) {
      this.grados = [];
      return;
    }

    // Simulación de carga de grados desde API
    const todosGrados = [
      { id: 1, nombre: 'Transición', sedeId: 1 },
      { id: 2, nombre: 'Primero', sedeId: 1 },
      { id: 3, nombre: 'Segundo', sedeId: 1 },
      { id: 4, nombre: 'Tercero', sedeId: 1 },
      { id: 5, nombre: 'Cuarto', sedeId: 1 },
      { id: 6, nombre: 'Quinto', sedeId: 1 },
      { id: 7, nombre: 'Transición', sedeId: 2 },
      { id: 8, nombre: 'Primero', sedeId: 2 },
      { id: 9, nombre: 'Segundo', sedeId: 2 },
    ];

    this.grados = todosGrados.filter((grado) => grado.sedeId === this.sedeSeleccionada);
  }

  cargarNotificaciones(): void {
    // Simulación de carga de notificaciones desde API
    this.notificaciones = [
      {
        id: 1,
        asunto: 'Reunión de padres - Primer periodo',
        tipo: 'Académica',
        sede: 'Principal',
        grado: 'Todos',
        fecha: new Date('2024-03-15T10:30:00'),
        estado: 'Enviada',
      },
      {
        id: 2,
        asunto: 'Entrega de boletines',
        tipo: 'Académica',
        sede: 'Principal',
        grado: 'Quinto',
        fecha: new Date('2024-03-10T08:15:00'),
        estado: 'Enviada',
      },
      {
        id: 3,
        asunto: 'Jornada de vacunación',
        tipo: 'Administrativa',
        sede: 'Sede B',
        grado: 'Primero',
        fecha: new Date('2024-03-20T09:00:00'),
        estado: 'Programada',
      },
      {
        id: 4,
        asunto: 'Simulacro de evacuación',
        tipo: 'Urgente',
        sede: 'Todas',
        grado: null,
        fecha: new Date('2024-03-25T11:00:00'),
        estado: 'Borrador',
      },
      {
        id: 5,
        asunto: 'Celebración día del niño',
        tipo: 'Evento',
        sede: 'Todas',
        grado: null,
        fecha: new Date('2024-04-30T08:00:00'),
        estado: 'Programada',
      },
    ];
  }

  aplicarFiltros(): void {
    // Simulación de filtrado de notificaciones
    console.log('Filtros aplicados:', {
      sede: this.sedeSeleccionada,
      grado: this.gradoSeleccionado,
      tipo: this.tipoSeleccionado,
      estado: this.estadoSeleccionado,
    });

    // Aquí iría la lógica para filtrar las notificaciones según los criterios seleccionados
    // Por ahora solo mostramos un mensaje en consola
  }

  nuevaNotificacion(): void {
    // Lógica para crear una nueva notificación
    console.log('Crear nueva notificación');
  }

  getBadgeClass(tipo: string): string {
    switch (tipo.toLowerCase()) {
      case 'académica':
        return 'badge-primary';
      case 'administrativa':
        return 'badge-secondary';
      case 'evento':
        return 'badge-success';
      case 'urgente':
        return 'badge-danger';
      default:
        return 'badge-info';
    }
  }

  getEstadoBadgeClass(estado: string): string {
    switch (estado.toLowerCase()) {
      case 'enviada':
        return 'badge-success';
      case 'programada':
        return 'badge-info';
      case 'borrador':
        return 'badge-secondary';
      default:
        return 'badge-light';
    }
  }
}

import { Component, OnInit } from "@angular/core";
import { Notification } from "src/models/notification/notification.model";
import { Action } from "src/models/parametric/action.model";
import { Pagination } from "src/models/parametric/pagination.model";
import { DataService } from "src/services/data.service";
import { NotificationService } from "src/services/notification/notification.service";


@Component({
  selector: "app-outbox",
  templateUrl: "./outbox.component.html",
  styleUrls: ["./outbox.component.scss"],
})
export class OutboxComponent implements OnInit {
  outBoxTitle = "Buzón de salida";
  outBoxSubtitle = "Gestión de notificaciones enviadas";
  headers: string[] = [
    "Descripción",
    "Descargos del estudiante",
    "Descargos del representante",
    "Fecha",
    "Docente",
    "Severidad",
    "Acción tomada",
    "Fecha descargo estudiante",
    "Fecha descargo representante",
    "Cita",
  ];

  keys: string[] = [
    "description",
    "studentDischarges",
    "parentDischarges",
    "date",
    "teacher",
    "severity",
    "actionTaken",
    "studentDischargesDate",
    "parentDischargesDate",
    "appointment",
  ];
  actions: Action[] = [];

  mensajes: Notification[] = [];
  pagination: Pagination = {
    currentPage: 1,
    itemPerPage: 5,
    totalItems: 0,
    totalPages: 0,
  };

  constructor(
    private notificationService: NotificationService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.getNotificaciones();
  }

  getNotificaciones(): void {
    const page = this.pagination.currentPage;
    const pageSize = this.pagination.itemPerPage;

    this.notificationService.getAllNotifications(page, pageSize).subscribe({
      next: (response) => {
        this.mensajes = response.data;
        this.pagination = {
          currentPage: response.pagination.currentPage,
          itemPerPage: response.pagination.itemPerPage,
          totalItems: response.pagination.totalItems,
          totalPages: response.pagination.totalPages,
        };
      },
      error: (err) => {
        console.error("Error cargando notificaciones:", err);
      },
    });
  }

  responderNotificacion(id: number): void {
    console.log("Responder a notificación:", id);
  }

  verDetalles(id: number): void {
    console.log("Ver detalles de notificación:", id);
  }

  archivarNotificacion(id: number): void {
    console.log("Archivar notificación:", id);
  }
}

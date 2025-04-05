import { Component, OnInit } from "@angular/core";
import { Action } from "src/models/parametric/action.model";
import { Pagination } from "src/models/parametric/pagination.model";
import { Message } from "src/models/school/message.model";

@Component({
  selector: "app-outbox",
  templateUrl: "./outbox.component.html",
  styleUrls: ["./outbox.component.scss"],
})
export class OutboxComponent implements OnInit {
  outBoxTitle: string;
  outBoxSubtitle: string;
  headers: string[] = [];
  keys: string[];
  actions: Action[];
  pagination: Pagination = null;

  mensajes: Message[] = [
    {
      asunto: "Reunión de padres - Primer periodo",
      destinatario: "Padres de familia - Grado 5°",
      fechaEnvio: "15/03/2024 10:30",
      estado: "Enviado",
      respuestas: 3,
    },
    {
      asunto: "Entrega de boletines",
      destinatario: "Todos los profesores",
      fechaEnvio: "10/03/2024 08:15",
      estado: "Enviado",
      respuestas: 5,
    },
    {
      asunto: "Recordatorio: Entrega de notas",
      destinatario: "Profesores - Sede Principal",
      fechaEnvio: "05/03/2024 14:45",
      estado: "Pendiente",
      respuestas: 0,
    },
  ];
  constructor() {
    this.headers = [
      "Asunto",
      "Destinatario",
      "Fecha de envío",
      "Estado",
      "Respuestas",
    ];
    this.keys = [
      "asunto",
      "destinatario",
      "fechaEnvio",
      "estado",
      "respuestas",
    ];
    this.pagination = {
      currentPage: 1,
      itemPerPage: 5,
      totalPages: Math.ceil(this.mensajes.length / 5),
      totalItems: this.mensajes.length,
    };
    this.actions = [];
  }

  ngOnInit(): void {}

  responderNotificacion(id: number): void {
    // Lógica para abrir modal de respuesta
    console.log("Responder a notificación:", id);
  }

  verDetalles(id: number): void {
    // Lógica para ver detalles
    console.log("Ver detalles de notificación:", id);
  }

  archivarNotificacion(id: number): void {
    // Lógica para archivar
    console.log("Archivar notificación:", id);
  }
}

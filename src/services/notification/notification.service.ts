import { Notification } from "src/models/notification/notification.model";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, switchMap } from "rxjs/operators";
import { Observable, throwError } from "rxjs";
import { Response } from "src/models/reponse.model";
import { DataService } from "../data.service";
import { NotificationByRol } from "src/models/notification/notificationbyRol.model";
import { NotificationForFranchiestGrade } from "src/models/notification/notificatioForFranchiestGrade.model";
import { SCHOOL, USER } from "src/util/constants";

@Injectable({
  providedIn: "root",
})
export class NotificationService {

  private ENDPOINT = "api/Notifications";

  constructor(private http: HttpClient, private dataService: DataService) {}

  getAllNotifications(
    page = 1,
    pageSize = 10,
    severity?: string,
    studentSchoolId?: number,
    teacherSchoolId?: number,
    pendingResponse?: boolean,
    fromDate?: string,
    toDate?: string
  ) {
    this.dataService.loadingScreen.next(true);
    return this.http
      .get<Response<Notification[]>>(`${environment.url}${this.ENDPOINT}/All`, {
        observe: "response",
        //params,
      })
      .pipe(
        map((response) => {
          let data = response.body;
          data.pagination = {
            currentPage: Number(response.headers.get("x-current-page")),
            itemPerPage: Number(response.headers.get("x-items-per-page")),
            totalItems: Number(response.headers.get("x-total-items")),
            totalPages: Number(response.headers.get("x-total-pages")),
          };
          this.dataService.loadingScreen.next(false);
          return data;
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError("No pudismos cargar los aliados");
        })
      );
  }
   // Nuevo método para crear una notificación programada
   createScheduledNotification(notification: Notification): Observable<Notification> {
    this.dataService.loadingScreen.next(true);
  // 👉 Construir solo los campos que quieres enviar

  console.log(notification)
  const notificationFormatted = {
    Description: notification.description,
    UserId: localStorage.getItem(USER),
    Severity: notification.severity,
    ActionTaken: notification.actionTaken,
    StudentSchoolId: localStorage.getItem(SCHOOL),
  };
    return this.http.post<Notification>(
      `${environment.url}${this.ENDPOINT}/CreateScheduled`,
      notificationFormatted,
    ).pipe(
      map(response => {
        this.dataService.loadingScreen.next(false);
        return response;
      }),
      catchError(err => {
        this.dataService.loadingScreen.next(false);
        return throwError("Error al programar la notificación");
      })
    );
  }
  // 👉 Método para formatear fecha
  private formatDate(date: string | Date): string {
    if (!date) return null;

    const d = new Date(date);

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0'); // +1 porque en JS los meses son 0-11
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const seconds = String(d.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
  createRoleNotification(notification: NotificationByRol): Observable<any> {
    this.dataService.loadingScreen.next(true);

    return this.http.post<Notification>(
      `${environment.url}${this.ENDPOINT}/ForShoolRol`,
      notification,
    ).pipe(
      map(response => {
        this.dataService.loadingScreen.next(false);
        return response;
      }),
      catchError(err => {
        this.dataService.loadingScreen.next(false);
        return throwError("Error al programar la notificación");
      })
    );
  }
  createNotificationForcourseGrade(notificationData: NotificationForFranchiestGrade): Observable<any> {
    this.dataService.loadingScreen.next(true);
    return this.http
      .post<Notification>(
        `${environment.url}${this.ENDPOINT}/SendNotification`,
        notificationData
      )
      .pipe(
        map((response) => {
          this.dataService.loadingScreen.next(false);
          return response;
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError("Error al enviar la notificación");
        })
      );
  }
}

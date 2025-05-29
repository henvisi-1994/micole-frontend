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

    /*let params: any = {
      pageNumber: page.toString(),
      pageSize: pageSize.toString(),
    };

    if (severity) params.severity = severity;
    if (studentSchoolId) params.studentSchoolId = studentSchoolId;
    if (teacherSchoolId) params.teacherSchoolId = teacherSchoolId;
    if (pendingResponse != null) params.pendingResponse = pendingResponse;
    if (fromDate) params.fromDate = fromDate;
    if (toDate) params.toDate = toDate;*/

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

    return this.http.post<Notification>(
      `${environment.url}${this.ENDPOINT}CreateScheduled`,
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
  createRoleNotification(notification: NotificationByRol): Observable<any> {
    this.dataService.loadingScreen.next(true);

    return this.http.post<Notification>(
      `${environment.url}${this.ENDPOINT}/ForSchoolRol`,
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

import { Notification } from "src/models/notification/notification.model";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, switchMap } from "rxjs/operators";
import { Observable, throwError } from "rxjs";
import { Response } from "src/models/reponse.model";
import { DataService } from "../data.service";
import { NotificationForFranchiestGrade } from "src/models/notification/notificatioForFranchiestGrade.model";

@Injectable({
  providedIn: "root",
})
export class NotificationService {

  private ENDPOINT = "api/Notifications";

  constructor(private http: HttpClient, private dataService: DataService) {}



  createNotificationForcourseGrade(notificationData: NotificationForFranchiestGrade): Observable<any> {
    this.dataService.loadingScreen.next(true);
    return this.http
      .post<Notification>(
        `${environment.url}${this.ENDPOINT}/ForCourseGrade`,
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

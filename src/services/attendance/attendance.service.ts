
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DataService } from "../data.service";
import { catchError, map, switchMap } from "rxjs/operators";
import { throwError } from "rxjs";
import { Response } from "src/models/reponse.model";
import { AttendanceByStudent } from "src/models/attendance/attendanceByStudent.model";
@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private ENDPOINT = "api/Attendances/";

  constructor(private http: HttpClient, private dataService: DataService) {}

  getAllAttendances(school: string, subject: string, level: string) {
    this.dataService.loadingScreen.next(true);
    const params = {
      school,
      subject,
      level,
    };

    return this.http
      .get<Response<AttendanceByStudent[]>>(`${environment.url}${this.ENDPOINT}`, { params })
      .pipe(
        map((response) => {
          this.dataService.loadingScreen.next(false);
          return response.data;
        }),
        catchError(() => {
          this.dataService.loadingScreen.next(false);
          return throwError("No pudimos cargar las asistencias");
        })
      );
  }


}

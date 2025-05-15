
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DataService } from "../data.service";
import { catchError, map, switchMap } from "rxjs/operators";
import { throwError } from "rxjs";
import { Response } from "src/models/reponse.model";
import { AttendanceByStudent } from "src/models/attendance/attendanceByStudent.model";
import { AttendanceStatsRequest } from "src/models/attendance/attendanceStatsRequest.model";
import { AttendanceStats } from "src/models/attendance/attendanceStat.model";
import { SCHOOL } from "src/util/constants";
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
  getAttendanceStats(request: AttendanceStatsRequest) {
    this.dataService.loadingScreen.next(true);

    return this.http
      .put<AttendanceStats[]>(`${environment.url}${this.ENDPOINT}${localStorage.getItem(SCHOOL)}/Stat`, request)
      .pipe(
        map((response) => {
          this.dataService.loadingScreen.next(false);
          return response
        }),
        catchError(() => {
          this.dataService.loadingScreen.next(false);
          return throwError("No pudimos cargar las estadísticas de asistencia");
        })
      );
  }


}

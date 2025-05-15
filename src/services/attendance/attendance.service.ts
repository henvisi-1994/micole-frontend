
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DataService } from "../data.service";
import { catchError, map, switchMap } from "rxjs/operators";
import { throwError } from "rxjs";
import { Response } from "src/models/reponse.model";
import { AttendanceForUpdate } from "src/models/attendance/attendanceForUpdate.model";
@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private ENDPOINT = "api/Attendances/";

  constructor(private http: HttpClient, private dataService: DataService) {}

 //update attendance
  updateAttendance(attendance: AttendanceForUpdate) {
    return this.http
      .put<Response<any>>(
        `${this.ENDPOINT}Update`,
        attendance
      )
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((error) => {
          return throwError(error);
        })
      );
  }


}

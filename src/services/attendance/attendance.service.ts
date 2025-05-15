import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DataService } from "../data.service";
import { catchError, map, switchMap } from "rxjs/operators";
import { throwError } from "rxjs";
import { Response } from "src/models/reponse.model";
import { AttendanceForUpdate } from "src/models/attendance/attendanceForUpdate.model";
import { AttendanceAttachment } from "src/models/attendance/attendanceAttachment.model";
@Injectable({
  providedIn: "root",
})
export class AttendanceService {
  private ENDPOINT = "api/Attendances/";

  constructor(private http: HttpClient, private dataService: DataService) {}

  //update attendance
  updateAttendance(attendance: AttendanceForUpdate) {
    return this.http
      .put<Response<any>>(`${environment.url}${this.ENDPOINT}Update`, attendance)
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((error) => {
          return throwError(error);
        })
      );
  }
  attachmentAttendance(attendanceAttachment: AttendanceAttachment) {
    const formData = new FormData();
    if (attendanceAttachment.file) {
      formData.append(
        "file",
        attendanceAttachment.file,
        attendanceAttachment.file.name
      );
    }
    formData.append("name", attendanceAttachment.name || "");
    formData.append("description", attendanceAttachment.description || "");
    formData.append("isUrl", attendanceAttachment.isUrl?.toString() || "false");
    formData.append("url", attendanceAttachment.url || "");
    formData.append("idAttendance", attendanceAttachment.id?.toString() || "");
    return this.http
      .put<Response<any>>(`${environment.url}${this.ENDPOINT}Update`, formData)
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

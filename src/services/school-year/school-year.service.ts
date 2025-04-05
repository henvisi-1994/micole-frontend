import { SchoolYearClose } from "./../../models/school-year/schoolYearClose.model";
import { SchoolYearPeriodSummary } from "./../../models/school-year/schoolYearPeriodSummary.model";
import { map, catchError, switchMap } from "rxjs/operators";
import { Response } from "./../../models/reponse.model";
import { DataService } from "./../data.service";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SchoolYearPeriod } from "src/models/school-year/schoolYearPeriod.model";
import { environment } from "src/environments/environment";
import { throwError } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SchoolYearService {
  ENDPOINT = "api/SchoolYears/";
  constructor(private http: HttpClient, private dataService: DataService) {}

  getPeriods(id: string) {
    this.dataService.loadingScreen.next(true);
    return this.http
      .get<Response<SchoolYearPeriod[]>>(
        `${environment.url}${this.ENDPOINT}${encodeURIComponent(id)}`
      )
      .pipe(
        map((response) => {
          this.dataService.loadingScreen.next(false);
          console.log(response.data)
          return response.data.map((s) => {
            s.status = s.open ? "Abierto" : "Cerrado";
            return s;
          });
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError("No pudimos cargar los periodos");
        })
      );
  }

  yearSummary(id: string) {
    this.dataService.loadingScreen.next(true);
    return this.http
      .get<Response<SchoolYearClose>>(
        `${environment.url}${this.ENDPOINT}${encodeURIComponent(
          id
        )}/YearSummary`
      )
      .pipe(
        map((response) => {
          this.dataService.loadingScreen.next(false);
          return response.data;
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError("No pudimos traer el resumen del año escolar");
        })
      );
  }

  create(id: string, value: any) {
    this.dataService.loadingScreen.next(true);
    return this.http
      .post(
        `${environment.url}${this.ENDPOINT}${encodeURIComponent(id)}`,
        value
      )
      .pipe(
        switchMap((response) => {
          return this.getPeriods(id);
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError("No pudimos crear el periodo");
        })
      );
  }

  summary(id: string) {
    this.dataService.loadingScreen.next(true);
    return this.http
      .get<Response<SchoolYearPeriodSummary>>(
        `${environment.url}${this.ENDPOINT}${encodeURIComponent(id)}/Summary`
      )
      .pipe(
        map((response) => {
          this.dataService.loadingScreen.next(false);
          return response.data;
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError("No pudimos traer el resumen del periodo");
        })
      );
  }

  closeYear(id) {
    this.dataService.loadingScreen.next(true);
    return this.http
      .put(
        `${environment.url}${this.ENDPOINT}${encodeURIComponent(id)}/Year`,
        {}
      )
      .pipe(
        map((response) => {
          this.dataService.loadingScreen.next(false);
          return "Hemos enviado el reporte de cierre de año exitosamente";
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError("No pudimos enviar el reporte del año escolar");
        })
      );
  }

  closeYearPoint(id) {
    this.dataService.loadingScreen.next(true);
    return this.http
      .put(
        `${environment.url}${this.ENDPOINT}${encodeURIComponent(
          id
        )}/Year/Points`,
        {}
      )
      .pipe(
        map((response) => {
          this.dataService.loadingScreen.next(false);
          return "Hemos cerrado el año escolar exitosamente";
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError("No pudimos cerrar el año escolar");
        })
      );
  }

  close(id: string, schoolYear: string) {
    this.dataService.loadingScreen.next(true);
    return this.http
      .put(
        `${environment.url}${this.ENDPOINT}${encodeURIComponent(id)}/Close`,
        {}
      )
      .pipe(
        switchMap((response) => {
          return this.getPeriods(schoolYear);
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError("No pudimos cerrar el periodo");
        })
      );
  }

  open(id: string, schoolYear: string) {
    this.dataService.loadingScreen.next(true);
    return this.http
      .put(
        `${environment.url}${this.ENDPOINT}${encodeURIComponent(id)}/Open`,
        {}
      )
      .pipe(
        switchMap((response) => {
          return this.getPeriods(schoolYear);
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError("No pudimos abrir el periodo");
        })
      );
  }

}

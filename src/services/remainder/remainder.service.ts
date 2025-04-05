import { Remainder } from "./../../models/remainder/remainder.model";
import { catchError, map } from "rxjs/operators";
import { throwError } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { DataService } from "./../data.service";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Response } from "./../../models/reponse.model";

@Injectable({
  providedIn: "root",
})
export class RemainderService {
  ENDPOINT = "api/Remainders/";

  constructor(private dataService: DataService, private http: HttpClient) {}

  readRemainder(id: string) {
    this.dataService.loadingScreen.next(true);
    return this.http
      .put(
        `${environment.url}${this.ENDPOINT}${encodeURIComponent(id)}/Read`,
        {}
      )
      .pipe(
        map((response) => {
          this.dataService.loadingScreen.next(false);
          return true;
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError("No pudimos leer la notificacion");
        })
      );
  }

  getRemainders(page: Number, pageSize: Number) {
    this.dataService.loadingScreen.next(true);
    return this.http
      .get<Response<Remainder>>(`${environment.url}${this.ENDPOINT}`, {
        observe: "response",
        params: {
          pageNumber: page.toString(),
          pageSize: pageSize.toString(),
        },
      })
      .pipe(
        map((response) => {
          this.dataService.loadingScreen.next(false);
          let data = response.body;
          let dataToReturn = {
            pagination: {
              currentPage: Number(response.headers.get("x-current-page")),
              itemPerPage: Number(response.headers.get("x-items-per-page")),
              totalItems: Number(response.headers.get("x-total-items")),
              totalPages: Number(response.headers.get("x-total-pages")),
            },
            code: data.code,
            codeName: data.codeName,
            data: data.data,
          };
          this.dataService.loadingScreen.next(false);
          return dataToReturn;
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError("No pudimos conseguir las notificationes");
        })
      );
  }
}

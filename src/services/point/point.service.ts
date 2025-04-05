import { Point } from "./../../models/point/point.model";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DataService } from "../data.service";
import { Response } from "src/models/reponse.model";
import { environment } from "src/environments/environment";
import { catchError, map } from "rxjs/operators";
import { throwError } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PointService {
  private ENDPOINT = "api/Points/";

  constructor(private http: HttpClient, private dataService: DataService) {}

  getPoints(page = 1, pageSize = 10) {
    this.dataService.loadingScreen.next(true);
    return this.http
      .get<Response<Point[]>>(`${environment.url}${this.ENDPOINT}`, {
        observe: "response",
        params: {
          pageNumber: page.toString(),
          pageSize: pageSize.toString(),
        },
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
          return throwError("No pudimos cargar los puntos");
        })
      );
  }
}

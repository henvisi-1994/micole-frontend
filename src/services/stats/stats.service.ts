import { catchError, map } from "rxjs/operators";
import { environment } from "./../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DataService } from "../data.service";
import { Response } from "src/models/reponse.model";
import { throwError } from "rxjs";
import { Stats } from "src/models/shared/stats.model";

@Injectable({
  providedIn: "root",
})
export class StatsService {
  ENDPOINT = "api/Stats/";
  constructor(private http: HttpClient, private dataService: DataService) {}

  stats(id: string, type: string) {
    this.dataService.loadingScreen.next(true);
    let path: string = `${environment.url}${this.ENDPOINT}${encodeURIComponent(
      id
    )}/${type}`;
    return this.http.get<Response<Stats[]>>(path).pipe(
      map((response) => {
        this.dataService.loadingScreen.next(false);
        return response.data;
      }),
      catchError((err) => {
        this.dataService.loadingScreen.next(false);
        return throwError("No pudimos conseguir las estadisticas");
      })
    );
  }
}

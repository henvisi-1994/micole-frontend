import { DataService } from "./../data.service";
import { catchError, map, switchMap } from "rxjs/operators";
import { Level } from "./../../models/level/level.model";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Response } from "src/models/reponse.model";
import { throwError } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class LevelService {
  private ENDPOINT = "api/Levels/";

  constructor(private http: HttpClient, private dataService: DataService) {}

  getLevels() {
    this.dataService.loadingScreen.next(true);
    return this.http
      .get<Response<Array<Level>>>(`${environment.url}${this.ENDPOINT}`)
      .pipe(
        map((response) => {
          this.dataService.loadingScreen.next(false);
          return response.data;
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError("No pudimos cargar los niveles");
        })
      );
  }

  deleteLevel(id) {
    this.dataService.loadingScreen.next(true);
    return this.http
      .delete(`${environment.url}${this.ENDPOINT}${encodeURIComponent(id)}`)
      .pipe(
        switchMap((response) => {
          return this.getLevels();
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError("No pudimos borrar el nivel");
        })
      );
  }

  updateLevel(id, value) {
    this.dataService.loadingScreen.next(true);
    const formData: FormData = new FormData();
    if (value.image) formData.append("image", value.image, value.image.name);
    formData.append("name", value.name);
    formData.append("description", value.description);
    formData.append("lowerBound", value.lowerBound);
    formData.append("upperBound", value.upperBound);
    return this.http
      .put(
        `${environment.url}${this.ENDPOINT}${encodeURIComponent(id)}`,
        formData
      )
      .pipe(
        map((response) => {
          this.dataService.loadingScreen.next(false);
          return "Hemos actualizado el nivel";
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError("No pudimos actualizar el nivel");
        })
      );
  }

  addLevel(value) {
    this.dataService.loadingScreen.next(true);
    const formData: FormData = new FormData();
    formData.append("image", value.image, value.image.name);
    formData.append("name", value.name);
    formData.append("description", value.description);
    formData.append("lowerBound", value.lowerBound);
    formData.append("upperBound", value.upperBound);
    return this.http.post(`${environment.url}${this.ENDPOINT}`, formData).pipe(
      map((response) => {
        this.dataService.loadingScreen.next(false);
        return "Hemos creado el nivel";
      }),
      catchError((err) => {
        this.dataService.loadingScreen.next(false);
        return throwError("No pudimos crear el nivel");
      })
    );
  }
}

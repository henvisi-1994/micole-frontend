import { Prize } from "./../../models/prize/prize.model";
import { AllyShow } from "src/models/ally/allyShow.model";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DataService } from "../data.service";
import { catchError, map, switchMap } from "rxjs/operators";
import { throwError } from "rxjs";
import { Response } from "src/models/reponse.model";
import { Ally } from "src/models/ally/ally.model";

@Injectable({
  providedIn: "root",
})
export class AllyService {
  private ENDPOINT = "api/Allies/";

  constructor(private http: HttpClient, private dataService: DataService) {}

  getSchoolAllies(
    school: string,
    name = "",
    page = 1,
    pageSize = 10,
    category?: string
  ) {
    this.dataService.loadingScreen.next(true);
    let params = {
      pageNumber: page.toString(),
      pageSize: pageSize.toString(),
      school,
      name,
    };
    if (category) {
      params["category"] = category;
    }
    return this.http
      .get<Response<Ally[]>>(`${environment.url}${this.ENDPOINT}`, {
        observe: "response",
        params,
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
          this.dataService.loadingScreen.next(false);
          return throwError("No pudismos cargar los aliados");
        })
      );
  }

  changeStatus(id: string, type: string) {
    this.dataService.loadingScreen.next(true);
    return this.http
      .put(
        `${environment.url}${this.ENDPOINT}${encodeURIComponent(id)}/${type}`,
        {}
      )
      .pipe(
        switchMap((response) => {
          return this.getAllyById(id);
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError("No pudimos cambiar el estado del aliado");
        })
      );
  }

  getAllPricesByAlly(id: string, name = "", page = 1, perPage = 10) {
    this.dataService.loadingScreen.next(true);
    return this.http
      .get<Response<Prize[]>>(
        `${environment.url}${this.ENDPOINT}${encodeURIComponent(id)}/Prices`,
        {
          observe: "response",
          params: {
            pageNumber: page.toString(),
            pageSize: perPage.toString(),
            name,
          },
        }
      )
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
          this.dataService.loadingScreen.next(false);
          return throwError("No pudismos cargar los premios");
        })
      );
  }

  getAllyById(id: string) {
    this.dataService.loadingScreen.next(true);
    return this.http
      .get<Response<AllyShow>>(
        `${environment.url}${this.ENDPOINT}${encodeURIComponent(id)}`
      )
      .pipe(
        map((response) => {
          this.dataService.loadingScreen.next(false);
          return response.data;
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError("No pudimos obtener la información del aliado");
        })
      );
  }

  updateAlly(
    id: string,
    name: string,
    description: string,
    contactDetail: string,
    file: File
  ) {
    this.dataService.loadingScreen.next(true);
    const formData: FormData = new FormData();
    if (file !== null) formData.append("logo", file);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("contactDetail", contactDetail);
    return this.http
      .put(
        `${environment.url}${this.ENDPOINT}${encodeURIComponent(id)}`,
        formData
      )
      .pipe(
        map((response) => {
          this.dataService.loadingScreen.next(false);
          return "Hemos actualizado el aliado";
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError("No pudimos acutlizar el aliado");
        })
      );
  }

  createAlly(
    id: string,
    name: string,
    description: string,
    contactDetail: string,
    franchises: string[],
    file: File
  ) {
    this.dataService.loadingScreen.next(true);
    const formData: FormData = new FormData();
    formData.append("logo", file);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("contactDetail", contactDetail);
    franchises.forEach((element, index) => {
      formData.append(`franchises[${index}]`, element);
    });
    formData.append("categoryId", id);
    return this.http.post(`${environment.url}${this.ENDPOINT}`, formData).pipe(
      map((response) => {
        this.dataService.loadingScreen.next(false);
        return "Hemos creado el aliado";
      }),
      catchError((err) => {
        this.dataService.loadingScreen.next(false);
        return throwError("No pudimos crear el aliado");
      })
    );
  }
}

import { Ally } from "./../../models/ally/ally.model";
import { catchError, switchMap } from "rxjs/operators";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Category } from "./../../models/category/category.model";
import { DataService } from "src/services/data.service";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Response } from "src/models/reponse.model";
import { throwError } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CategoryService {
  private ENDPOINT = "api/Categories/";

  constructor(private http: HttpClient, private dataService: DataService) {}

  getCategories() {
    this.dataService.loadingScreen.next(true);
    return this.http
      .get<Response<Category[]>>(`${environment.url}${this.ENDPOINT}`)
      .pipe(
        map((response) => {
          this.dataService.loadingScreen.next(false);
          return response.data;
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError("No pudimos cargar las categorias");
        })
      );
  }

  addCategory(category: { name: string; description: string }) {
    this.dataService.loadingScreen.next(true);
    return this.http.post(`${environment.url}${this.ENDPOINT}`, category).pipe(
      map((response) => {
        this.dataService.loadingScreen.next(false);
        return "Hemos creado la categoria";
      }),
      catchError((err) => {
        this.dataService.loadingScreen.next(false);
        return throwError("No pudimos crear la categoria");
      })
    );
  }

  updateCategory(id: string, category: { name: string; description: string }) {
    this.dataService.loadingScreen.next(true);
    return this.http
      .put(
        `${environment.url}${this.ENDPOINT}${encodeURIComponent(id)}`,
        category
      )
      .pipe(
        map((response) => {
          this.dataService.loadingScreen.next(false);
          return "Hemos actualizado la categoria";
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError("No pudimos actualizar la categoria");
        })
      );
  }

  deleteCategory(id: string) {
    this.dataService.loadingScreen.next(true);
    return this.http
      .delete(`${environment.url}${this.ENDPOINT}${encodeURIComponent(id)}`)
      .pipe(
        switchMap((response) => {
          return this.getCategories();
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError("No pudimos borrar la categoria");
        })
      );
  }

  getAlliesByCategory(id: string, name = "", page = 1, perPage = 10) {
    this.dataService.loadingScreen.next(true);
    return this.http
      .get<Response<Ally[]>>(
        `${environment.url}${this.ENDPOINT}${encodeURIComponent(id)}/Allies`,
        {
          observe: "response",
          params: {
            pageNumber: page.toString(),
            pageSize: perPage.toString(),
            name: name,
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
          return throwError("No pudismos cargar los aliados");
        })
      );
  }
}

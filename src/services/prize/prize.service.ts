import { SCHOOL } from "./../../util/constants";
import { Redemption } from "./../../models/redemption/redemption.model";
import { Prize } from "./../../models/prize/prize.model";
import { DataService } from "src/services/data.service";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { catchError, map, switchMap } from "rxjs/operators";
import { throwError } from "rxjs";
import { Response } from "src/models/reponse.model";
import { Coupon } from "src/models/coupon/coupon.model";
import { AllyService } from "../ally/ally.service";

@Injectable({
  providedIn: "root",
})
export class PrizeService {
  private ENDPOINT = "api/Prices/";

  constructor(
    private http: HttpClient,
    private dataService: DataService,
    private allyService: AllyService
  ) {}

  redemPrize(id: string, ally?: string) {
    this.dataService.loadingScreen.next(true);
    return this.http
      .post(
        `${environment.url}${this.ENDPOINT}${encodeURIComponent(
          id
        )}/Redemptions`,
        {}
      )
      .pipe(
        switchMap((response) => {
          this.dataService.loadingScreen.next(false);
          if (ally) return this.allyService.getAllPricesByAlly(ally);
          return this.getPrices(localStorage.getItem(SCHOOL));
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError("No pudimos redimir el premios");
        })
      );
  }

  getPrices(school: string, name = "", page = 1, pageSize = 10) {
    this.dataService.loadingScreen.next(true);
    return this.http
      .get<Response<Prize[]>>(`${environment.url}${this.ENDPOINT}`, {
        observe: "response",
        params: {
          pageNumber: page.toString(),
          pageSize: pageSize.toString(),
          name,
          school,
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
          return throwError("No pudimos cargar los premios");
        })
      );
  }

  getAllCoupons(id: string, page = 1, pageSize = 10) {
    this.dataService.loadingScreen.next(true);
    return this.http
      .get<Response<Coupon[]>>(
        `${environment.url}${this.ENDPOINT}${encodeURIComponent(id)}/Coupons`,
        {
          observe: "response",
          params: {
            pageNumber: page.toString(),
            pageSize: pageSize.toString(),
          },
        }
      )
      .pipe(
        map((response) => {
          let data = response.body;
          const newData = data.data.map((x) => {
            x.usedText = x.used ? "SI" : "NO";
            return x;
          });
          data.data = newData;
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
          return throwError("No pudimos cargar los cupones");
        })
      );
  }

  getAllRedemptions(id: string, page = 1, pageSize = 10) {
    this.dataService.loadingScreen.next(true);
    return this.http
      .get<Response<Redemption[]>>(
        `${environment.url}${this.ENDPOINT}${encodeURIComponent(
          id
        )}/Redemptions`,
        {
          observe: "response",
          params: {
            pageNumber: page.toString(),
            pageSize: pageSize.toString(),
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
          return throwError("No pudimos cargar los redenciones");
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
          return this.getById(id);
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError("No pudimos cambiar el estado del premio");
        })
      );
  }

  getById(id: string) {
    this.dataService.loadingScreen.next(true);
    return this.http
      .get<Response<Prize>>(
        `${environment.url}${this.ENDPOINT}${encodeURIComponent(id)}`
      )
      .pipe(
        map((response) => {
          this.dataService.loadingScreen.next(false);
          return response.data;
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError("No pudimos obtener el premio");
        })
      );
  }

  uploadCoupons(id: string, file: File) {
    this.dataService.loadingScreen.next(true);
    const formData: FormData = new FormData();
    formData.append("file", file, file.name);
    return this.http
      .put(
        `${environment.url}${this.ENDPOINT}${encodeURIComponent(id)}/Coupons`,
        formData
      )
      .pipe(
        map((response) => {
          this.dataService.loadingScreen.next(false);
          return "Hemos creado los cupones correctamente";
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError("No pudimos crear los cupones");
        })
      );
  }

  addPrize(
    id: string,
    name: string,
    description: string,
    points: number,
    file: File
  ) {
    this.dataService.loadingScreen.next(true);
    const formData: FormData = new FormData();
    formData.append("icon", file, file.name);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("points", points.toString());
    formData.append("allyId", id);
    return this.http.post(`${environment.url}${this.ENDPOINT}`, formData).pipe(
      map((response) => {
        this.dataService.loadingScreen.next(false);
        return "Hemos creado el premio";
      }),
      catchError((err) => {
        this.dataService.loadingScreen.next(false);
        return throwError("No pudimos crear el premio");
      })
    );
  }

  updatePrize(
    id: string,
    name: string,
    description: string,
    points: number,
    file: File
  ) {
    this.dataService.loadingScreen.next(true);
    const formData: FormData = new FormData();
    if (file) formData.append("icon", file, file.name);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("points", points.toString());
    return this.http
      .put(
        `${environment.url}${this.ENDPOINT}${encodeURIComponent(id)}`,
        formData
      )
      .pipe(
        map((response) => {
          this.dataService.loadingScreen.next(false);
          return "Hemos actualizado el premio";
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError("No pudimos actualizar el premio");
        })
      );
  }
}

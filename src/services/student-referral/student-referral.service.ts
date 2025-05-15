import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, map } from "rxjs/operators";
import { throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { DataService } from "../data.service";
import { Response } from "src/models/reponse.model";
import { StudentReferral } from "src/models/school/studentReferral.model";
import { Pagination } from "src/models/parametric/pagination.model";

@Injectable({
  providedIn: "root",
})
export class StudentReferralService {
  ENDPOINT = "api/StudentReferrals/";

  constructor(private http: HttpClient, private dataService: DataService) {}

  createReferral(studentReferral: StudentReferral) {
    this.dataService.loadingScreen.next(true);
    return this.http.post(`${environment.url}${this.ENDPOINT}`, studentReferral).pipe(
      map((response) => {
        this.dataService.loadingScreen.next(false);
        return "Hemos creado la referencia del estudiante";
      }),
      catchError((error) => {
        this.dataService.loadingScreen.next(false);
        return throwError("No se pudo crear la referencia del usuario.");
      })
    );
  }

  getReferral(id: string) {
    this.dataService.loadingScreen.next(true);
    return this.http.get<Response<StudentReferral>>(`${environment.url}${this.ENDPOINT}${id}`).pipe(
      map((response) => {
        this.dataService.loadingScreen.next(false);
        return response.data;
      }),
      catchError((error) => {
        this.dataService.loadingScreen.next(false);
        return throwError("Failed to fetch referral.");
      })
    );
  }
  getReferralsByPagination(
    page: number = 1,
    perPage: number = 10,
    search: string = ""
  ) {
    this.dataService.loadingScreen.next(true);

    const request = this.http.get<Response<any>>(`${environment.url}${this.ENDPOINT}/All`, {
      observe: "response",
      params: {
        fullName: search, // Cambia esto si tu backend usa otro campo de búsqueda
        pageNumber: page.toString(),
        pageSize: perPage.toString(),
      },
    });

    return request.pipe(
      map((response) => {
        const data = response.body;
        const dataToReturn = {
          pagination: {
            currentPage: Number(response.headers.get("x-current-page")),
            itemPerPage: Number(response.headers.get("x-items-per-page")),
            totalItems: Number(response.headers.get("x-total-items")),
            totalPages: Number(response.headers.get("x-total-pages")),
          },
          code: data.code,
          codeName: data.codeName,
          data: data.data, // aquí vienen los StudentReferralForReturn
        };
        this.dataService.loadingScreen.next(false);
        return dataToReturn;
      }),
      catchError((error) => {
        this.dataService.loadingScreen.next(false);
        return throwError("Unable to load referrals");
      })
    );
  }

  updateReferral(id: string, data: StudentReferral) {
    this.dataService.loadingScreen.next(true);
    return this.http.put<Response<StudentReferral>>(`${environment.url}${this.ENDPOINT}${id}`, data).pipe(
      map((response) => {
        this.dataService.loadingScreen.next(false);
        return response.data;
      }),
      catchError((error) => {
        this.dataService.loadingScreen.next(false);
        return throwError("Failed to update referral.");
      })
    );
  }

  deleteReferral(id: string) {
    this.dataService.loadingScreen.next(true);
    return this.http.delete(`${environment.url}${this.ENDPOINT}${id}`).pipe(
      map(() => {
        this.dataService.loadingScreen.next(false);
        return "Referral deleted successfully.";
      }),
      catchError((error) => {
        this.dataService.loadingScreen.next(false);
        return throwError("Failed to delete referral.");
      })
    );
  }

  getReferralReasons() {
    this.dataService.loadingScreen.next(true);
    return this.http.get<Response<any[]>>(`${environment.url}${this.ENDPOINT}reasons`).pipe(
      map((response) => {
        this.dataService.loadingScreen.next(false);
        return response.data;
      }),
      catchError((error) => {
        this.dataService.loadingScreen.next(false);
        return throwError("Failed to load referral reasons.");
      })
    );
  }
}

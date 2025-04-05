import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { catchError, map, switchMap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Response } from 'src/models/reponse.model';
import { environment } from 'src/environments/environment';
import { Case } from 'src/models/cases/case.model';
import { CaseById } from 'src/models/cases/caseById.model';

@Injectable({
  providedIn: 'root'
})
export class CaseService {
  ENDPOINT = "api/Cases/";

  constructor(private http: HttpClient, private dataService: DataService) {}

  getById(id: string) {
    this.dataService.loadingScreen.next(true);
    return this.http
      .get<Response<CaseById>>(
        `${environment.url}${this.ENDPOINT}${encodeURIComponent(id)}`
      )
      .pipe(
        map((response) => {
          this.dataService.loadingScreen.next(false);
          response.data.lifeAtRiskText = response.data.lifeAtRisk ? "SI": "NO"
          response.data.answersTransformed = response.data.answers ? JSON.parse(response.data.answers): null
          response.data.studentGuidenceSheetTransformed = response.data.studentGuidenceSheet ? JSON.parse(response.data.studentGuidenceSheet): null
          response.data.status = response.data.status === 'OPEN' ? "Abierto" : response.data.status === 'ATTEND' ? "En atención": "Cerrado"
          return response.data;
        }),
        catchError((err) => {
          console.log(err)
          this.dataService.loadingScreen.next(false);
          return throwError("No pudimos obtener el detalle del caso");
        })
      );
  }

  createComment(id: string, text: string) {
    this.dataService.loadingScreen.next(true)
    return this.http.put(`${environment.url}${this.ENDPOINT}${encodeURIComponent(id)}/Record`, {
      message: text
    }).pipe(
      switchMap((response) => {
        return this.getById(id);
      }),
      catchError((err) => {
        this.dataService.loadingScreen.next(false);
        return throwError("No pudimos añadir el comentario");
      })
    )
  }

  close(id: string) {
    this.dataService.loadingScreen.next(true)
    return this.http.put(`${environment.url}${this.ENDPOINT}${encodeURIComponent(id)}/Close`, {
      
    }).pipe(
      switchMap((response) => {
        return this.getById(id);
      }),
      catchError((err) => {
        this.dataService.loadingScreen.next(false);
        return throwError("No pudimos cerrar el caso");
      })
    )
  }

  studentCard(id: string, data: any, observation?: string) {
    this.dataService.loadingScreen.next(true)
    return this.http.put(`${environment.url}${this.ENDPOINT}${encodeURIComponent(id)}/StudentSheet`, {
      studentSheet: JSON.stringify(data),
      message: observation
    }).pipe(
      switchMap((response) => {
        return this.getById(id);
      }),
      catchError((err) => {
        this.dataService.loadingScreen.next(false);
        return throwError("No pudimos crear la ficha del estudiante");
      })
    )
  }

  getAllCases(name: string, page: number, perPage: number) {
    this.dataService.loadingScreen.next(true)
    return this.http.get<Response<Case[]>>(`${environment.url}${this.ENDPOINT}`, {
      observe: "response",
      params: {
        pageNumber: page.toString(),
        pageSize: perPage.toString(),
        name
      }
    }).pipe(
      map((response) => {
        this.dataService.loadingScreen.next(false)
        let data = response.body;
        let dataToReturn: Response<Case[]> = {
          pagination: {
            currentPage: Number(response.headers.get("x-current-page")),
            itemPerPage: Number(response.headers.get("x-items-per-page")),
            totalItems: Number(response.headers.get("x-total-items")),
            totalPages: Number(response.headers.get("x-total-pages")),
          },
          code: data.code,
          codeName: data.codeName,
          data: data.data.map((s) => {
            s.lifeAtRiskText = s.lifeAtRisk ? "SI": "NO"
            s.status = s.status === 'OPEN' ? "Abierto" : s.status === 'ATTEND' ? "En atención": "Cerrado"
            return s
          }),
        };
        this.dataService.loadingScreen.next(false);
        return dataToReturn;
      }, catchError((err) => {
        this.dataService.loadingScreen.next(false)
        return throwError('Hemos tenido un error al obtener los casos')
      }))
    )
  }

  notify() {
    this.dataService.loadingScreen.next(true)
    return this.http.post(`${environment.url}${this.ENDPOINT}Notify` ,{}).pipe(
      map((response) => {
        this.dataService.loadingScreen.next(false)
        return 'Hemos notificado al orientador'
      }, catchError((err) => {
        this.dataService.loadingScreen.next(false)
        return throwError('Hemos tenido un error al tratar de notificar el usuario')
      }))
    )
  }

  create(lifeAtRisk: boolean, answers: string) {
    this.dataService.loadingScreen.next(true)
    return this.http.post(`${environment.url}${this.ENDPOINT}` ,{
      lifeAtRisk,
      answers
    }).pipe(
      map((response) => {
        this.dataService.loadingScreen.next(false)
        return 'Hemos creado el caso'
      }, catchError((err) => {
        this.dataService.loadingScreen.next(false)
        return throwError('No pudimos crear el caso')
      }))
    )
  }

  createCounselor(studentId: string, lifeAtRisk: boolean, answers: string) {
    this.dataService.loadingScreen.next(true)
    return this.http.post(`${environment.url}${this.ENDPOINT}Create` ,{
      lifeAtRisk,
      answers,
      studentId
    }).pipe(
      map((response) => {
        this.dataService.loadingScreen.next(false)
        return 'Hemos creado el caso'
      }, catchError((err) => {
        this.dataService.loadingScreen.next(false)
        return throwError('No pudimos crear el caso')
      }))
    )
  }


  getMessage() {
    this.dataService.loadingScreen.next(true)
    return this.http.get<Response<string>>(`${environment.url}${this.ENDPOINT}Message`).pipe(
      map((response) => {
        this.dataService.loadingScreen.next(false)
        return {data: response.data}
      }, catchError((err) => {
        this.dataService.loadingScreen.next(false)
        return throwError('No pudimos obtener el mensaje que se mostrara cuando la vida corre peligro')
      }))
    )
  }

}

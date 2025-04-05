import { DataService } from './../data.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class PeriodService {
  ENDPOINT = "api/Periods/"
  ENDPOINT_SCHOOL = "api/Schools/"

  constructor(private http: HttpClient,
    private dataService: DataService) { }

  createPeriod(value: {position: number, description: string}, school: string) {
    this.dataService.loadingScreen.next(true)
    return this.http.post(`${environment.url}${this.ENDPOINT_SCHOOL}${encodeURIComponent(school)}/Periods`,value)
      .pipe(map(resposne => {
        this.dataService.loadingScreen.next(false)
        return "Hemos creado el periodo exitosamente"
      }), catchError(err => {
        this.dataService.loadingScreen.next(false)
        return throwError("No pudimos crear el periodo")
      }))
  }

  updatePeriod(id: string, value: {position: number, description: string}) {
    this.dataService.loadingScreen.next(true)
    return this.http.put(`${environment.url}${this.ENDPOINT}${encodeURIComponent(id)}`, value)
      .pipe(map(resposne => {
        this.dataService.loadingScreen.next(false)
        return "Hemos actualizado el periodo exitosamente"
      }), catchError(err => {
        this.dataService.loadingScreen.next(false)
        return throwError("No pudimos actualizar el periodo")
      }))
  }

  deletePeriod(id: string) {
    this.dataService.loadingScreen.next(true)
    return this.http.delete(`${environment.url}${this.ENDPOINT}${encodeURIComponent(id)}`)
      .pipe(map(response => {
        this.dataService.loadingScreen.next(false)
        return "El periodo fue eliminado"
      }), catchError(err => {
        this.dataService.loadingScreen.next(false)
        return throwError("No pudimos borrar el periodo por que ya tiene información asociada")
      }))
  }
}

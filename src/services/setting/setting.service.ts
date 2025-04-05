import { DataService } from './../data.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { tap, map, catchError } from 'rxjs/operators'
import { throwError } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class SettingService {
  ENDPOINT = "api/Settings/"
  ENDPOINT_SCHOOL = "api/Schools/"

  constructor(private http: HttpClient,
    private dataService: DataService) { }

  createSetting(value: {rule: string, value: number},school: string) {
    this.dataService.loadingScreen.next(true)
    return this.http.post(`${environment.url}${this.ENDPOINT_SCHOOL}${encodeURIComponent(school)}/Settings`, value)
      .pipe(map(response => {
        this.dataService.loadingScreen.next(false)
        return "La configuración fue creada exitosamente"
      }),catchError(error => {
        this.dataService.loadingScreen.next(false)
        return throwError('No pudimos crear la configuracion')
      }))
  }

  deleteSetting(id: string) {
    this.dataService.loadingScreen.next(true)
    return this.http.delete(`${environment.url}${this.ENDPOINT}${encodeURIComponent(id)}`)
      .pipe(map(response => {
        this.dataService.loadingScreen.next(false)
        return "La configuración fue eliminada"
      }), catchError(error => {
        this.dataService.loadingScreen.next(false)
        return throwError('No pudimos eliminar la configuracion')
      }))
  }

  updateSetting(id:string, value: {rule: string, value: number}) {
    this.dataService.loadingScreen.next(true)
    return this.http.put(`${environment.url}${this.ENDPOINT}${encodeURIComponent(id)}`, value)
    .pipe(map(response => {
      this.dataService.loadingScreen.next(false)
      return "La configuración fue acutualizada exitosamente"
    }), catchError(error => {
      this.dataService.loadingScreen.next(false)
      return throwError('No pudimos actualizar la configuracion')
    }))
  }
}

import { map, catchError } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'src/services/data.service';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AcheivementService {
  ENDPOINT = "api/Acheivements/"

  constructor(private dataService: DataService, private http: HttpClient) { }

  updateAcheivement(id: string, value: any) {
    this.dataService.loadingScreen.next(true)
    return this.http.put(`${environment.url}${this.ENDPOINT}${encodeURIComponent(id)}`,  value)
      .pipe(map(response => {
        this.dataService.loadingScreen.next(false)
        return "Hemos actualizado el desempeño"
      }), catchError(err => {
        this.dataService.loadingScreen.next(false)
        return throwError("No pudimos actualizar el desempeño")
      }))
  }

  deleteAcheivement(id: string) {
    this.dataService.loadingScreen.next(false)
    return this.http.delete(`${environment.url}${this.ENDPOINT}${encodeURIComponent(id)}`)
      .pipe(map(response => {
        this.dataService.loadingScreen.next(false)
        return "Hemos borrado el desempeño"
      }), catchError(err => {
        this.dataService.loadingScreen.next(false)
        return throwError("No pudimos borrar el desempeño")
      }))
  }

  updateAcheivementByUser(id: string, value: any) {
    this.dataService.loadingScreen.next(true)
    return this.http.put(`${environment.url}${this.ENDPOINT}${encodeURIComponent(id)}/ByUser`,  value)
      .pipe(map(response => {
        this.dataService.loadingScreen.next(false)
        return "Hemos actualizado el desempeño"
      }), catchError(err => {
        this.dataService.loadingScreen.next(false)
        return throwError("No pudimos actualizar el desempeño")
      }))
  }

  deleteAcheivementByUser(id: string) {
    this.dataService.loadingScreen.next(false)
    return this.http.delete(`${environment.url}${this.ENDPOINT}${encodeURIComponent(id)}/ByUser`)
      .pipe(map(response => {
        this.dataService.loadingScreen.next(false)
        return "Hemos borrado el desempeño"
      }), catchError(err => {
        this.dataService.loadingScreen.next(false)
        return throwError("No pudimos borrar el desempeño")
      }))
  }

}

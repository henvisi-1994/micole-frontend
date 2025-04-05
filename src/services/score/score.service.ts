import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'src/services/data.service';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  ENDPOINT = 'api/Scores/'

  constructor(private dataService: DataService, private http: HttpClient) { }

  updateScore(id: string, value: any) {
    this.dataService.loadingScreen.next(true)
    return this.http.put(`${environment.url}${this.ENDPOINT}${encodeURIComponent(id)}`, value)
      .pipe(map(response => {
        return "Hemos actualizado la calificación"
      }), catchError(err => {
        this.dataService.loadingScreen.next(false)
        if(err.error && err.error.data && err.error.data.message && err.error.data.message.includes("El periodo esta cerrado")) return throwError(err.error.data.message)
        return throwError("No pudimos actualizar la calificación")
      }))
  }

  uploadExcel(id: string, file: any) {
    this.dataService.loadingScreen.next(true)
    let data = new FormData()
    data.append('taskId', id)
    data.append('grades', file)
    return this.http.post(`${environment.url}${this.ENDPOINT}`, data)
      .pipe(map(response => {
        return "Hemos actualizado la calificaciones"
      }), catchError(err => {
        this.dataService.loadingScreen.next(false)
        if(err.error && err.error.data && err.error.data.message && err.error.data.message.includes("El periodo esta cerrado")) return throwError(err.error.data.message)
        return throwError("No pudimos actualizar las calificaciones")
      }))
  }

}

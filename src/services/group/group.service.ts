import { Response } from './../../models/reponse.model';
import { HttpClient } from '@angular/common/http';
import { DataService } from './../data.service';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { throwError } from 'rxjs'
import { GroupById } from 'src/models/group/groupById.model';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  ENDPOINT = "api/Groups/"
  ENDPOINT_SUBJECT = "api/Subjects/"
  ENDPOINT_SCHOOL = "api/Schools/"

  constructor(private dataService: DataService,
    private http: HttpClient) { }

  createGroup(value: {name: string, description: string}, school: string) {
    this.dataService.loadingScreen.next(true)
    return this.http.post(`${environment.url}${this.ENDPOINT_SCHOOL}${encodeURIComponent(school)}/Groups`, value)
      .pipe(map(response => {
        this.dataService.loadingScreen.next(false)
        return "Hemos creado el área exitosamente"
      }), catchError(err => {
        this.dataService.loadingScreen.next(false)
        return throwError("No pudimos creaer el área, recuerda que deben tener nombres únicos")
      }))
  }

  deleteSubject(id: string, subject: string) {
    this.dataService.loadingScreen.next(true)
    return this.http.delete(`${environment.url}${this.ENDPOINT}${encodeURIComponent(id)}/Subjects/${encodeURIComponent(subject)}`)
      .pipe(mergeMap(response => {
        return this.getGroupById(id)
      }), catchError(err => {
        this.dataService.loadingScreen.next(false)
        return throwError("No pudimos borrar la materia porque ya tiene información asociada")
      }))
  }

  updateSubject(id: string, subject: string, value: any) {
    this.dataService.loadingScreen.next(true)
    return this.http.put(`${environment.url}${this.ENDPOINT_SUBJECT}${encodeURIComponent(subject)}`, value)
      .pipe(mergeMap(response => {
        return this.getGroupById(id)
      }), catchError(err => {
        this.dataService.loadingScreen.next(false)
        return throwError("No pudimos actualizar la materia recuerda que debe tener nombre único y la suma del porcentaje de todas materias debe ser 100%")
      }))
  }

  createSubject(id: string, value: {name: string, description: string, percentage: number}) {
    this.dataService.loadingScreen.next(true)
    return this.http.post(`${environment.url}${this.ENDPOINT}${encodeURIComponent(id)}/Subjects`, value)
      .pipe(mergeMap(response => {
        return this.getGroupById(id)
      }), catchError(err => {
        this.dataService.loadingScreen.next(false)
        return throwError("No pudimos crear  la materia, recuerda que debe tener nombre único y la suma del porcentaje de todas materias debe ser 100%")
      }))
  }

  getGroupById(id: string) {
    this.dataService.loadingScreen.next(true)
    return this.http.get<Response<GroupById>>(`${environment.url}${this.ENDPOINT}${encodeURIComponent(id)}`)
      .pipe(map(response => {
        this.dataService.loadingScreen.next(false)
        return response.data
      }), catchError(err => {
        this.dataService.loadingScreen.next(false)
        return throwError("No encontramos el grupo")
      }))
  }

  updateGroup(id: string, value: {name: string, description: string}) {
    this.dataService.loadingScreen.next(true)
    return this.http.put(`${environment.url}${this.ENDPOINT}${encodeURIComponent(id)}`, value)
    .pipe(map(response => {
      this.dataService.loadingScreen.next(false)
      return "Hemos actualizado el grupo exitosamente"
    }), catchError(err => {
      this.dataService.loadingScreen.next(false)
      return throwError("No hemos podido actualizarr el grupo, recuerda que deben tener nombres únicos")
    }))

  }

  deleteGroup(id: string, school: string) {
    this.dataService.loadingScreen.next(true)
    return this.http.delete(`${environment.url}${this.ENDPOINT_SCHOOL}${encodeURIComponent(school)}/Groups/${encodeURIComponent(id)}`)
    .pipe(map(response => {
      this.dataService.loadingScreen.next(false)
      return "Hemos eliminado el grupo exitosamente"
    }), catchError(err => {
      this.dataService.loadingScreen.next(false)
      return throwError("No hemos podido eliminar el grupo, porque ya tiene información asociada")
    }))
  }
}

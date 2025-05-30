import { Response } from './../../models/reponse.model';
import { HttpClient } from '@angular/common/http';
import { DataService } from './../data.service';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs'
import { GradeById } from 'src/models/grade/gradeById.model';

@Injectable({
  providedIn: 'root'
})
export class GradeService {
  ENDPOINT = "api/Grades/"
  ENDPOINT_SCHOOL = "api/Schools/"
  ENDPOINT_COURSE = "api/Courses/"
  ENDPOINT_FRANCHISE = "api/Franchises/"

  constructor(private dataService: DataService,
    private http: HttpClient) { }

  getGradeById(id: string) {
    this.dataService.loadingScreen.next(true)
    return this.http.get<Response<GradeById>>(`${environment.url}${this.ENDPOINT}${encodeURIComponent(id)}`)
      .pipe(map(response => {
        this.dataService.loadingScreen.next(false)
        return response.data
      }), catchError(err => {
        this.dataService.loadingScreen.next(false)
        return throwError("No encontramos el grado")
      }))
  }

  createCourse(id: string, value: any) {
    this.dataService.loadingScreen.next(true)
    return this.http.post(`${environment.url}${this.ENDPOINT}${encodeURIComponent(id)}/Courses`, value)
      .pipe(map(response => {
        this.dataService.loadingScreen.next(false)
        return "Hemos creado el curso exitosamente"
      }), catchError(err => {
        this.dataService.loadingScreen.next(false)
        return throwError("No hemos podido crear el curso, recuerda que el nombre debe ser único por año escolar")
      }))
  }

  createGrade(value: {name: string, description: string, preschool: boolean}, school: string) {
    this.dataService.loadingScreen.next(true)
    return this.http.post(`${environment.url}${this.ENDPOINT_SCHOOL}${encodeURIComponent(school)}/Grades`, value)
      .pipe(map(response => {
        this.dataService.loadingScreen.next(false)
        return "Hemos creado el grado exitosamente"
      }), catchError(err => {
        this.dataService.loadingScreen.next(false)
        return throwError("No hemos podido crear el grado, recuerda que deben tener nombres únicos")
      }))
  }

  updateGrade(id: string, value: {name: string, description: string, preschool: boolean}) {
    this.dataService.loadingScreen.next(true)
    return this.http.put(`${environment.url}${this.ENDPOINT}${encodeURIComponent(id)}`, value)
    .pipe(map(response => {
      this.dataService.loadingScreen.next(false)
      return "Hemos actualizado el grado exitosamente"
    }), catchError(err => {
      this.dataService.loadingScreen.next(false)
      return throwError("No hemos podido actualizarr el grado, recuerda que deben tener nombres únicos")
    }))
  }

  deleteGrade(id: string, school: string) {
    this.dataService.loadingScreen.next(true)
    return this.http.delete(`${environment.url}${this.ENDPOINT_SCHOOL}${encodeURIComponent(school)}/Grades/${encodeURIComponent(id)}`)
    .pipe(map(response => {
      this.dataService.loadingScreen.next(false)
      return "Hemos eliminado el grado exitosamente"
    }), catchError(err => {
      this.dataService.loadingScreen.next(false)
      return throwError("No hemos podido eliminar el grado, porque ya tiene información asociada")
    }))
  }

  getGrades(school: string) {
    return this.http.get<Response<GradeById[]>>(`${environment.url}${this.ENDPOINT}${encodeURIComponent(school)}/Grades`)
      .pipe(map(response => {
        return response.data
      }))
  }

  getCoursesByGrade(school: string, idGrade: string) {
    return this.http.get<Response<GradeById[]>>(`${environment.url}${this.ENDPOINT_COURSE}Grade/${encodeURIComponent(idGrade)}`)
      .pipe(map(response => {
        return response.data
      }))
  }

  //https://localhost:44388/api/Franchises/wJbXMLRaAJqDc68%2f2kPP9A%3d%3d/School
  getFranchises(school: string) {
    return this.http.get<Response<any[]>>(`${environment.url}${this.ENDPOINT_FRANCHISE}${encodeURIComponent(school)}/School`)
      .pipe(map(response => {
        return response.data
      }))
  }
}

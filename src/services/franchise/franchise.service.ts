import { schoolDay } from './../../models/parametric/schoolDay.model';
import { month } from './../../models/parametric/month.model';
import { FranchiseById } from './../../models/franchise/franchiseById.model';
import { Response } from './../../models/reponse.model';
import { map, catchError, mergeMap, switchMap } from 'rxjs/operators';
import { throwError} from 'rxjs';
import { DataService } from './../data.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from 'src/models/user/user.model';

@Injectable({
  providedIn: 'root'
})
export class FranchiseService {
  ENDPOINT = "api/Franchises/"
  ENDPOINT_SCHOOL = "api/Schools/"

  constructor(private http: HttpClient, private dataService: DataService) { }

  addCounselor(id: string, user: string) {
    this.dataService.loadingScreen.next(true)
    return this.http.post(`${environment.url}${this.ENDPOINT}${encodeURIComponent(id)}/Users/${encodeURIComponent(user)}`,{})
      .pipe(mergeMap(response => {
        return this.getCounselor(id)
      }), catchError(err => {
        return throwError("No pudimos añadir el orientador")
      }))
    
  }

  deleteCounselor(id: string, user: string) {
    this.dataService.loadingScreen.next(true)
    return this.http.delete(`${environment.url}${this.ENDPOINT}${encodeURIComponent(id)}/Users/${encodeURIComponent(user)}`)
      .pipe(mergeMap(response => {
        this.dataService.loadingScreen.next(true)
        return this.getCounselor(id)
      }), catchError(err => {
        return throwError("No pudimos eliminar el orientador")
      }))
    
  }

  getCounselor(id: string) {
    this.dataService.loadingScreen.next(true)
    return this.http.get<Response<User[]>>(`${environment.url}${this.ENDPOINT}${encodeURIComponent(id)}/Counselors`)
      .pipe(map(response => {
        this.dataService.loadingScreen.next(false)
        return response.data;
      }), catchError(error => {
        this.dataService.loadingScreen.next(false)
        return throwError("No pudimos cargar los orientadores")
      }))
  }

  getFranchiseById(id: string) {
    this.dataService.loadingScreen.next(true)
    return this.http.get<Response<FranchiseById>>(`${environment.url}${this.ENDPOINT}${encodeURIComponent(id)}`)
      .pipe(map(response => {
        this.dataService.loadingScreen.next(false)
        response.data.schoolYears.forEach(d => {
          d.normalizedStartMonth = month[d.startMonth]
          d.normalizedEndMonth = month[d.endMonth]
          d.normalizedSchoolDay = schoolDay[d.schoolDay]
          d.franchiseName = response.data.name
        })
        return response.data
      }), catchError(error => {
        this.dataService.loadingScreen.next(false)
        return throwError("Sede no encontrada")
      }))
  }

  disableFranchise(id: string, school: string) {
    this.dataService.loadingScreen.next(true)
    let request = this.http.delete(`${environment.url}${this.ENDPOINT_SCHOOL}${encodeURIComponent(school)}/Franchises/${encodeURIComponent((id))}`)
    return request.pipe(mergeMap(response => {
      return this.getFranchiseById(id)
    }), catchError(err => {
      this.dataService.loadingScreen.next(false)
      return "No pudimos cambiar el estado de la sede"
    }))
  }

  restoreFranchise(id: string, school: string) {
    this.dataService.loadingScreen.next(true)
    let request = this.http.post(`${environment.url}${this.ENDPOINT_SCHOOL}${encodeURIComponent(school)}/Franchises/${encodeURIComponent((id))}`,{})
    return request.pipe(mergeMap(response => {
      return this.getFranchiseById(id)
    }), catchError(err => {
      this.dataService.loadingScreen.next(false)
      return "No pudimos cambiar el estado de la sede"
    }))
  }

  updateFranchise(id: string, value: any) {
    this.dataService.loadingScreen.next(true)
    return this.http.put(`${environment.url}${this.ENDPOINT}${encodeURIComponent(id)}`, value)
      .pipe(map(response => {
        this.dataService.loadingScreen.next(false)
        return "La información de la sede fue actualizada"
      }), catchError(error => {
        this.dataService.loadingScreen.next(false)
        return throwError("No pudimos actualizar la información de la sede")
      }))
  }

  createFranchise(value: any, school: string) {
    this.dataService.loadingScreen.next(true)
    return this.http.post(`${environment.url}${this.ENDPOINT_SCHOOL}${encodeURIComponent(school)}/Franchises`,value)
      .pipe(map(response => {
        this.dataService.loadingScreen.next(false)
        return 'La sede fue creada correctamente'
      }), catchError(err => {
        this.dataService.loadingScreen.next(false)
        return throwError('En su plan no se pueden crear mas sedes, por favor contacte con mi cole, para actualizar su plan')
      }))
  }

  createSchoolYear(id: string, value: any) {
    this.dataService.loadingScreen.next(true)
    return this.http.post(`${environment.url}${this.ENDPOINT}${encodeURIComponent(id)}/SchoolYears`, value)
      .pipe(mergeMap(response => {
        return this.getFranchiseById(id)
      }), catchError(err  => {
        this.dataService.loadingScreen.next(false)
        return throwError("No pudimos crear el año escolar")
      }))
  }

  updateSchoolYear(id: string, schoolYear: string, value: any) {
    this.dataService.loadingScreen.next(true)
    return this.http.put(`${environment.url}${this.ENDPOINT}${encodeURIComponent(id)}/SchoolYears/${encodeURIComponent(schoolYear)}`, value)
      .pipe(mergeMap(response => {
        return this.getFranchiseById(id)
      }), catchError(err  => {
        this.dataService.loadingScreen.next(false)
        return throwError("No pudimos actualizar el año escolar")
      }))
  }

  deleteSchoolYear(id: string, schoolYear: string) {
    this.dataService.loadingScreen.next(true)
    return this.http.delete(`${environment.url}${this.ENDPOINT}${encodeURIComponent(id)}/SchoolYears/${encodeURIComponent(schoolYear)}`)
      .pipe(mergeMap(response => {
        return this.getFranchiseById(id)
      }), catchError(err  => {
        this.dataService.loadingScreen.next(false)
        return throwError("No pudimos borrar el año escolar, porque ya tiene información asociada")
      }))
  }

}

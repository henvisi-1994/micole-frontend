import { Router } from '@angular/router';
import { environment } from './../../environments/environment';
import { LoginInfo } from './../../models/auth/loginInfo.model';
import { Response } from './../../models/reponse.model';
import { REFRESH, PERMISSION, ROLE, SCHOOL, USER } from './../../util/constants';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators'
import { throwError } from 'rxjs'

import { Authentication } from './../../models/auth/authentication.model';
import { DataService } from './../data.service';
import { TOKEN } from 'src/util/constants';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  ENDPOINT = "api/Auth/"
  constructor(private http: HttpClient, private dataService: DataService, private router: Router) { }

  login(credentials: Authentication) {
    this.dataService.loadingScreen.next(true)
    return this.http.post(`${environment.url}${this.ENDPOINT}Login`, credentials, {
      observe: 'response'
    }).pipe(map(response => {
      localStorage.setItem(TOKEN,response.headers.get('x-token'))
      localStorage.setItem(REFRESH,response.headers.get('x-refresh-token'))
      this.dataService.loadingScreen.next(false)
      let body = response.body as Response<LoginInfo>
      this.dataService.userData.next(body.data)
      localStorage.setItem(USER,body.data.user.id)
      localStorage.setItem(SCHOOL, body.data.school?.id)
      localStorage.setItem(PERMISSION,JSON.stringify(body.data.permissions))
      localStorage.setItem(ROLE,JSON.stringify(body.data.roles))
      return body.data
    }), catchError(response => {
      this.dataService.loadingScreen.next(false)
      let message = 'Credenciales invalidas'
      if(response.error.data.message === "The account has not been verified") {
        message = 'La cuenta no ha sido verificada'
      }else if(response.error.data.message === 'A school is required') {
        message = 'Un colegio es requerido para iniciar sesión'
      }
      this.dataService.breadcrumbs.next([])
      this.dataService.userData.next(null)
      return throwError(message);
    }))
  }

  me() {
    this.dataService.loadingScreen.next(true)
    return this.http.get<Response<LoginInfo>>(`${environment.url}${this.ENDPOINT}Me`)
      .pipe(map(reponse => {
        this.dataService.userData.next(reponse.data)
        this.dataService.loadingScreen.next(false)
        // this.dataService.breadcrumbs.next(['Home'])
        return reponse.data
      }), catchError(error => {
        localStorage.removeItem(USER)
        localStorage.removeItem(TOKEN)
        localStorage.removeItem(REFRESH)
        localStorage.removeItem(PERMISSION)
        localStorage.removeItem(ROLE)
        localStorage.removeItem(SCHOOL)
        this.dataService.userData.next(null)
        this.dataService.loadingScreen.next(false)
        this.dataService.breadcrumbs.next([])
        return Observable.of(null)
      }))
  }

  refresh() {
    return this.http.post(`${environment.url}${this.ENDPOINT}Token`, {
      token: localStorage.getItem(REFRESH)
    }, {
      observe: 'response'
    }).pipe(map(response => {
      localStorage.setItem(TOKEN,response.headers.get('x-token'))
      localStorage.setItem(REFRESH,response.headers.get('x-refresh-token'))
      let body = response.body as Response<LoginInfo>
      localStorage.setItem(PERMISSION,JSON.stringify(body.data.permissions))
      localStorage.setItem(ROLE,JSON.stringify(body.data.roles))
      localStorage.setItem(SCHOOL, body.data.school?.id)
      localStorage.setItem(USER,body.data.user.id)
    }))
  }

  hasPermission(permission: string[]): boolean {
    let hasPermission = false
    const userPermission = JSON.parse(localStorage.getItem(PERMISSION)) as string[]
      permission.forEach(x => {
        if(userPermission.includes(x)) {
          hasPermission = true
        }
      })
      return  hasPermission
  }

  hasRole(roles: string[]): boolean {
    let hasPermission = false
    const userRoles = JSON.parse(localStorage.getItem(ROLE)) as string[]
      roles.forEach(x => {
        if(userRoles.includes(x)) {
          hasPermission = true
        }
      })
      return  hasPermission
  }

  logout() {
    localStorage.removeItem(TOKEN)
    localStorage.removeItem(REFRESH)
    localStorage.removeItem(PERMISSION)
    localStorage.removeItem(ROLE)
    localStorage.removeItem(SCHOOL)
    this.dataService.userData.next(null)
    this.dataService.breadcrumbs.next([])
  }
}

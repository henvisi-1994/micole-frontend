import { AuthService } from 'src/services/auth/auth.service';
import { REFRESH, PERMISSION, ROLE, SCHOOL } from './../../util/constants';
import { Router } from '@angular/router';
import { tap, catchError, map, mergeMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { TOKEN } from 'src/util/constants';
import { DataService } from 'src/services/data.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private dataService: DataService, private router: Router,
    private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.indexOf('Auth/Token') !== -1) {
      return next.handle(request);
    }
    let headers = new HttpHeaders({
      "Authorization": `Bearer ${localStorage.getItem(TOKEN)}`,
      "Accept": "application/json"
    });
    const modifiedRequest = request.clone({
      headers: headers
    });
    if(this.dataService.isAuthenticated()) {
      return next.handle(modifiedRequest).pipe(catchError((err: HttpErrorResponse) => {
        if(err.status === 401) {
          return this.authService.refresh().pipe(catchError(err => {
            this.dataService.loadingScreen.next(false)
            localStorage.removeItem(TOKEN)
            localStorage.removeItem(REFRESH)
            localStorage.removeItem(PERMISSION)
            localStorage.removeItem(ROLE)
            localStorage.removeItem(SCHOOL)
            this.router.navigate(['/login'])
            return Observable.of(null)
          }), mergeMap(res => {
            let headers = new HttpHeaders({
              "Authorization": `Bearer ${localStorage.getItem(TOKEN)}`,
              "Accept": "application/json"
            });
            const modifiedRequest = request.clone({
              headers: headers
            });
            return next.handle(modifiedRequest)
          }))
        } else {
          return next.handle(modifiedRequest);
        }
      }))
    } else {
      return next.handle(modifiedRequest);
    }

  }
}

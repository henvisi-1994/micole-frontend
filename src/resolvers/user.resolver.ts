import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/services/auth/auth.service';
import { Observable, throwError } from 'rxjs';
import { LoginInfo } from './../models/auth/loginInfo.model';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { DataService } from 'src/services/data.service';
import 'rxjs/add/observable/of';


@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<LoginInfo> {

  constructor(private dataService: DataService, private authService: AuthService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): LoginInfo | Observable<LoginInfo> | Promise<LoginInfo> {
    if(this.dataService.userData.value)
      return this.dataService.userData.value
    else
      return this.authService.me()
  }

}

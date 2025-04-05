import { UserService } from './../services/user/user.service';
import { UserById } from './../models/user/userById.model';
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
export class UserByResolver implements Resolve<UserById> {

  constructor(private userService: UserService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): UserById | Observable<UserById> | Promise<UserById> {
    return this.userService.getUserById(route.paramMap.get('id'))
  }

}

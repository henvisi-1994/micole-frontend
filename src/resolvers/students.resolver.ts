import { SCHOOL } from './../util/constants';
import { UserService } from './../services/user/user.service';
import { Response } from '../models/reponse.model';
import { Observable, throwError } from 'rxjs';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { DataService } from 'src/services/data.service';
import 'rxjs/add/observable/of';
import { User } from 'src/models/user/user.model';


@Injectable({
  providedIn: 'root'
})
export class StudentsResolver implements Resolve<Response<User[]>> {

  constructor(private userService: UserService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Response<User[]> | Observable<Response<User[]>> | Promise<Response<User[]>> {
    return this.userService.getStudentsByPagination(1,10,"",localStorage.getItem(SCHOOL))
  }

}

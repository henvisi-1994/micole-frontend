import { RemainderService } from './../services/remainder/remainder.service';
import { Remainder } from './../models/remainder/remainder.model';
import { SCHOOL, USER } from './../util/constants';
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
export class RemainderResolver implements Resolve<Response<Remainder>> {

  constructor(private remainderService: RemainderService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Response<Remainder> | Observable<Response<Remainder>> | Promise<Response<Remainder>> {
    return this.remainderService.getRemainders(1,10)
  }

}

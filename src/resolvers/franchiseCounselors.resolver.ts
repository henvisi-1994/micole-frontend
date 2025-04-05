import { FranchiseById } from '../models/franchise/franchiseById.model';
import { UserService } from '../services/user/user.service';
import { UserById } from '../models/user/userById.model';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/services/auth/auth.service';
import { Observable, throwError } from 'rxjs';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import 'rxjs/add/observable/of';
import { FranchiseService } from 'src/services/franchise/franchise.service';
import { User } from 'src/models/user/user.model';


@Injectable({
  providedIn: 'root'
})
export class FranchiseCounselorsResolver implements Resolve<User[]> {

  constructor(private franchiseService: FranchiseService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): User[] | Observable<User[]> | Promise<User[]> {
    return this.franchiseService.getCounselor(route.paramMap.get('franchise_id'))
  }

}

import { FranchiseById } from './../models/franchise/franchiseById.model';
import { UserService } from './../services/user/user.service';
import { UserById } from './../models/user/userById.model';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/services/auth/auth.service';
import { Observable, throwError } from 'rxjs';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import 'rxjs/add/observable/of';
import { FranchiseService } from 'src/services/franchise/franchise.service';


@Injectable({
  providedIn: 'root'
})
export class FranchiseByResolver implements Resolve<FranchiseById> {

  constructor(private franchiseService: FranchiseService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): FranchiseById | Observable<FranchiseById> | Promise<FranchiseById> {
    return this.franchiseService.getFranchiseById(route.paramMap.get('franchise_id'))
  }

}

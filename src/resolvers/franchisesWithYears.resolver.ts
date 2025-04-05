import { FranchiseWithSchoolYear } from './../models/franchise/franchiseWithSchoolYears.model';
import { SchoolById } from './../models/school/schoolById.model';
import { SchoolService } from './../services/school/school.service';
import { Response } from './../models/reponse.model';
import { School } from './../models/school/school.model';
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
export class FranchiseWithSchoolYearResolver implements Resolve<FranchiseWithSchoolYear[]> {

  constructor(private dataService: DataService, private schoolService: SchoolService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): FranchiseWithSchoolYear[] | Observable<FranchiseWithSchoolYear[]> | Promise<FranchiseWithSchoolYear[]> {
    return this.schoolService.getFranchiseInfo(route.paramMap.get('id'))
  }

}

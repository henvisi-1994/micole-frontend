import { SchoolYearClose } from './../models/school-year/schoolYearClose.model';
import { SchoolYearPeriodSummary } from './../models/school-year/schoolYearPeriodSummary.model';
import { SchoolYearService } from './../services/school-year/school-year.service';
import { SchoolService } from '../services/school/school.service';
import { Response } from '../models/reponse.model';
import { School } from '../models/school/school.model';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/services/auth/auth.service';
import { Observable, throwError } from 'rxjs';
import { LoginInfo } from '../models/auth/loginInfo.model';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { DataService } from 'src/services/data.service';
import 'rxjs/add/observable/of';
import { SchoolYearPeriod } from 'src/models/school-year/schoolYearPeriod.model';


@Injectable({
  providedIn: 'root'
})
export class SchoolYearSummaryResolver implements Resolve<SchoolYearClose> {

  constructor(private dataService: DataService, private schoolYearService: SchoolYearService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): SchoolYearClose | Observable<SchoolYearClose> | Promise<SchoolYearClose> {
    return this.schoolYearService.yearSummary(route.paramMap.get('school_year_id'))
  }

}

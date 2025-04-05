import { Acheivement } from './../models/acheivement/acheivement.model';
import { UserService } from '../services/user/user.service';
import { CourseService } from '../services/course/course.service';
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
import { CourseById } from 'src/models/course/courseById.model';
import { PeriodSchool } from 'src/models/school/schoolById.model';


@Injectable({
  providedIn: 'root'
})
export class PeriodResolver implements Resolve<PeriodSchool[]> {

  constructor(private schoolService: SchoolService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): PeriodSchool[] | Observable<PeriodSchool[]> | Promise<PeriodSchool[]> {
    const id = route.parent.parent.parent.paramMap.get('id');
    return this.schoolService.getPeriods(id)
  }

}

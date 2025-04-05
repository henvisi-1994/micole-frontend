import { UserService } from './../services/user/user.service';
import { CourseService } from './../services/course/course.service';
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


@Injectable({
  providedIn: 'root'
})
export class CoursesResolver implements Resolve<Response<CourseById[]>> {

  constructor(private courseService: CourseService, private authService: AuthService,
    private schoolService: SchoolService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Response<CourseById[]> | Observable<Response<CourseById[]>> | Promise<Response<CourseById[]>> {
    if(this.authService.hasRole(['SuperAdmin']))
      return this.courseService.getCourses()
    else if(this.authService.hasRole(['Admin','Counselor']))
      return this.schoolService.getCourses()
  }

}

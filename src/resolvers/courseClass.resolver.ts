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
import { CourseSubjectById } from 'src/models/course-subject/courseSubjectById.model';
import { CourseClass } from 'src/models/course-class/courseClass.model';


@Injectable({
  providedIn: 'root'
})
export class CourseClassResolver implements Resolve<CourseClass[]> {

  constructor(private courseService: CourseService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): CourseClass[] | Observable<CourseClass[]> | Promise<CourseClass[]> {
    // console.log(route.paramMap)
    return this.courseService.getClasses(route.parent.parent.paramMap.get('id'), route.paramMap.get('subject_id'))
  }

}

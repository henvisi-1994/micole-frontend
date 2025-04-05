import { Attendace } from './../models/attendance/attendance.model';
import { Task } from './../models/task/task.model';
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
import 'rxjs/add/observable/of';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AttendaceResolver implements Resolve<Attendace[]> {

  constructor(private courseService: CourseService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Attendace[] | Observable<Attendace[]> | Promise<Attendace[]> {
    const subjectId = route.paramMap.get('subject_id');
    const courseId = route.parent.parent.parent.paramMap.get('id');
    return this.courseService.getAttendances(courseId, subjectId, moment().format('YYYY-MM-DD'))
  }

}

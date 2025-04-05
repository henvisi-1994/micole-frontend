import { User } from './../models/user/user.model';
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

@Injectable({
  providedIn: 'root'
})
export class StudentResolver implements Resolve<User[]> {

  constructor(private courseService: CourseService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): User[] | Observable<User[]> | Promise<User[]> {
    const courseId = route.parent.parent.parent.paramMap.get('id');
    return this.courseService.getStudents(courseId)
  }

}

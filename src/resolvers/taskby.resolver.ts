import { TaskService } from './../services/task/task.service';
import { TaskById } from './../models/task/taskById.model';
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
import { DataService } from 'src/services/data.service';
import 'rxjs/add/observable/of';
import { CourseById } from 'src/models/course/courseById.model';


@Injectable({
  providedIn: 'root'
})
export class TaskByResolver implements Resolve<TaskById> {

  constructor(private taskService: TaskService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): TaskById | Observable<TaskById> | Promise<TaskById> {
    const id = route.paramMap.get('id');
    return this.taskService.getTaskById(id);
  }

}

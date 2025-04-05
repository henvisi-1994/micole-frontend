import { TaskInfo } from 'src/models/task/taskInfo.model';
import { USER } from './../util/constants';
import { UserService } from './../services/user/user.service';
import { UpcomingEvent } from './../models/event/upcomingEvent.model';
import { CourseService } from '../services/course/course.service';
import { Observable } from 'rxjs';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import 'rxjs/add/observable/of';


@Injectable({
  providedIn: 'root'
})
export class UpcomingTasksResolver implements Resolve<TaskInfo[]> {

  constructor(private userService: UserService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): TaskInfo[] | Observable<TaskInfo[]> | Promise<TaskInfo[]> {
    let id = localStorage.getItem(USER)
    if(route.paramMap.has('id'))
      id = route.paramMap.get('id')
    return this.userService.getUpcomingTasks(id)
  }

}

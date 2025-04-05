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
export class UpcomingEventsStudentResolver implements Resolve<UpcomingEvent> {

  constructor(private userService: UserService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): UpcomingEvent | Observable<UpcomingEvent> | Promise<UpcomingEvent> {
    let id = localStorage.getItem(USER)
    if(route.paramMap.has('id'))
      id = route.paramMap.get('id')
    return this.userService.getUpcomingEvents(id)
  }

}

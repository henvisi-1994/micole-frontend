import { NotificationByCourse } from './../models/notification/notificationByCourse.model';
import { USER } from './../util/constants';
import { UserService } from './../services/user/user.service';
import { Observable } from 'rxjs';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import 'rxjs/add/observable/of';

@Injectable({
  providedIn: 'root'
})
export class NotificationResolver implements Resolve<NotificationByCourse[]> {

  constructor(private userService: UserService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): NotificationByCourse[] | Observable<NotificationByCourse[]> | Promise<NotificationByCourse[]> {
    let id = localStorage.getItem(USER)
    if(route.paramMap.has('id'))
      id = route.paramMap.get('id')
    return this.userService.getNotifications(id)
  }

}

import { DataService } from 'src/services/data.service';
import { USER } from './../util/constants';
import { MyAttendace } from './../models/attendance/myAttendance.model';
import { UserService } from './../services/user/user.service';
import { Observable } from 'rxjs';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import 'rxjs/add/observable/of';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class MyAttendaceResolver implements Resolve<MyAttendace[]> {

  constructor(private userService: UserService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MyAttendace[] | Observable<MyAttendace[]> | Promise<MyAttendace[]> {
    let id = localStorage.getItem(USER)
    if(route.paramMap.has('id'))
      id = route.paramMap.get('id')
    return this.userService.getAttendance(id,moment().format('YYYY-MM-DD'))
  }

}

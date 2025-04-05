import { GroupService } from './../services/group/group.service';
import { Observable } from 'rxjs';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import 'rxjs/add/observable/of';
import { GroupById } from 'src/models/group/groupById.model';


@Injectable({
  providedIn: 'root'
})
export class GroupByResolver implements Resolve<GroupById> {

  constructor(private groupService: GroupService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): GroupById | Observable<GroupById> | Promise<GroupById> {
    return this.groupService.getGroupById(route.paramMap.get('id'))
  }

}

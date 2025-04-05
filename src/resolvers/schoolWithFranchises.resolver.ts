import { SchoolService } from "./../services/school/school.service";
import { SchoolWithFranchises } from "./../models/school/schoolWithFranchises.model";
import { NotificationByCourse } from "./../models/notification/notificationByCourse.model";
import { USER } from "./../util/constants";
import { UserService } from "./../services/user/user.service";
import { Observable } from "rxjs";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { Injectable } from "@angular/core";
import "rxjs/add/observable/of";

@Injectable({
  providedIn: "root",
})
export class SchoolWithFranchisesResolver
  implements Resolve<SchoolWithFranchises[]>
{
  constructor(private schoolService: SchoolService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | SchoolWithFranchises[]
    | Observable<SchoolWithFranchises[]>
    | Promise<SchoolWithFranchises[]> {
    return this.schoolService.getFranchises();
  }
}

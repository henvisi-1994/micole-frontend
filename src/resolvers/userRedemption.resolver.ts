import { UserRedemption } from "./../models/redemption/userRedemption.model";
import { UserService } from "./../services/user/user.service";
import { Response } from "../models/reponse.model";
import { Observable, throwError } from "rxjs";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from "@angular/router";
import { Injectable } from "@angular/core";
import { DataService } from "src/services/data.service";
import "rxjs/add/observable/of";
import { User } from "src/models/user/user.model";
import { USER } from "src/util/constants";

@Injectable({
  providedIn: "root",
})
export class UserRedemptionResolver
  implements Resolve<Response<UserRedemption[]>>
{
  constructor(
    private dataService: DataService,
    private userService: UserService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Response<UserRedemption[]>
    | Observable<Response<UserRedemption[]>>
    | Promise<Response<UserRedemption[]>> {
    return this.userService.redemptions(localStorage.getItem(USER));
  }
}

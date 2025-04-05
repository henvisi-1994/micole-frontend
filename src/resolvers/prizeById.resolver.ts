import { RemainderService } from "./../services/remainder/remainder.service";
import { Remainder } from "./../models/remainder/remainder.model";
import { SCHOOL, USER } from "./../util/constants";
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
import { Prize } from "src/models/prize/prize.model";
import { PrizeService } from "src/services/prize/prize.service";

@Injectable({
  providedIn: "root",
})
export class PrizeByIdResolver implements Resolve<Prize> {
  constructor(private prizeService: PrizeService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Prize | Observable<Prize> | Promise<Prize> {
    return this.prizeService.getById(route.params["id"]);
  }
}

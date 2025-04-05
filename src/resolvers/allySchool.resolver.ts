import { SCHOOL } from "./../util/constants";
import { AllyShow } from "src/models/ally/allyShow.model";
import { Category } from "./../models/category/category.model";
import { CategoryService } from "./../services/category/category.service";
import { Level } from "../models/level/level.model";
import { Observable } from "rxjs";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from "@angular/router";
import { Injectable } from "@angular/core";
import "rxjs/add/observable/of";
import { GroupById } from "src/models/group/groupById.model";
import { LevelService } from "src/services/level/level.service";
import { AllyService } from "src/services/ally/ally.service";
import { Ally } from "src/models/ally/ally.model";
import { Response } from "src/models/reponse.model";

@Injectable({
  providedIn: "root",
})
export class AllySchoolResolver implements Resolve<Response<Ally[]>> {
  constructor(private allyService: AllyService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Response<Ally[]>
    | Observable<Response<Ally[]>>
    | Promise<Response<Ally[]>> {
    return this.allyService.getSchoolAllies(localStorage.getItem(SCHOOL));
  }
}

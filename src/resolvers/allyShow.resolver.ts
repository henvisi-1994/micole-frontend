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

@Injectable({
  providedIn: "root",
})
export class AllyShowResolver implements Resolve<AllyShow> {
  constructor(private allyService: AllyService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): AllyShow | Observable<AllyShow> | Promise<AllyShow> {
    return this.allyService.getAllyById(route.params["id"]);
  }
}

import { Level } from "./../models/level/level.model";
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

@Injectable({
  providedIn: "root",
})
export class LevelResolver implements Resolve<Level[]> {
  constructor(private levelService: LevelService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Level[] | Observable<Level[]> | Promise<Level[]> {
    return this.levelService.getLevels();
  }
}

import { Point } from "./../models/point/point.model";
import { SCHOOL } from "./../util/constants";
import { PrizeService } from "src/services/prize/prize.service";
import { Prize } from "./../models/prize/prize.model";
import { CategoryService } from "src/services/category/category.service";
import { Response } from "../models/reponse.model";
import { Observable, throwError } from "rxjs";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from "@angular/router";
import { Injectable } from "@angular/core";
import "rxjs/add/observable/of";
import { Ally } from "src/models/ally/ally.model";
import { AllyService } from "src/services/ally/ally.service";
import { PointService } from "src/services/point/point.service";

@Injectable({
  providedIn: "root",
})
export class PointResolver implements Resolve<Response<Point[]>> {
  constructor(private pointService: PointService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Response<Point[]>
    | Observable<Response<Point[]>>
    | Promise<Response<Point[]>> {
    return this.pointService.getPoints();
  }
}

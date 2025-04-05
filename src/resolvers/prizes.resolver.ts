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

@Injectable({
  providedIn: "root",
})
export class PrizeResolver implements Resolve<Response<Prize[]>> {
  constructor(private prizeService: PrizeService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Response<Prize[]>
    | Observable<Response<Prize[]>>
    | Promise<Response<Prize[]>> {
    return this.prizeService.getPrices(localStorage.getItem(SCHOOL));
  }
}

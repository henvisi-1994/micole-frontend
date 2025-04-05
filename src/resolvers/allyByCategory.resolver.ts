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

@Injectable({
  providedIn: "root",
})
export class AllyByCategoryResolver implements Resolve<Response<Ally[]>> {
  constructor(private categoryService: CategoryService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Response<Ally[]>
    | Observable<Response<Ally[]>>
    | Promise<Response<Ally[]>> {
    return this.categoryService.getAlliesByCategory(route.params["id"]);
  }
}

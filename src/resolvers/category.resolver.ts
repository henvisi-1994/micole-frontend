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

@Injectable({
  providedIn: "root",
})
export class CategoryResolver implements Resolve<Category[]> {
  constructor(private categoryService: CategoryService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Category[] | Observable<Category[]> | Promise<Category[]> {
    return this.categoryService.getCategories();
  }
}

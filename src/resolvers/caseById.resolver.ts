import { RemainderService } from "../services/remainder/remainder.service";
import { Remainder } from "../models/remainder/remainder.model";
import { SCHOOL, USER } from "../util/constants";
import { UserService } from "../services/user/user.service";
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
import { CaseById } from 'src/models/cases/caseById.model';
import { CaseService } from 'src/services/case/case.service';

@Injectable({
  providedIn: "root",
})
export class CaseByIdResolver implements Resolve<CaseById> {
  constructor(private caseService: CaseService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): CaseById | Observable<CaseById> | Promise<CaseById> {
    return this.caseService.getById(route.params["id"]);
  }
}

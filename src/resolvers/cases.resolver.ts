import { SCHOOL } from "../util/constants";
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
import { User } from "src/models/user/user.model";
import { Case } from 'src/models/cases/case.model';
import { CaseService } from 'src/services/case/case.service';

@Injectable({
  providedIn: "root",
})
export class CasesResolver implements Resolve<Response<Case[]>> {
  constructor(private caseService: CaseService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Response<Case[]>
    | Observable<Response<Case[]>>
    | Promise<Response<Case[]>> {
    return this.caseService.getAllCases("",1, 10);
  }
}

import { ParametricService } from 'src/services/parametric/parametric.service';
import { SchoolParametric } from 'src/models/parametric/school.model';
import { SchoolById } from './../models/school/schoolById.model';
import { SchoolService } from './../services/school/school.service';
import { Observable } from 'rxjs';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import 'rxjs/add/observable/of';


@Injectable({
  providedIn: 'root'
})
export class SchoolParametricResolver implements Resolve<SchoolParametric[]> {

  constructor(private parametricService: ParametricService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): SchoolParametric[] | Observable<SchoolParametric[]> | Promise<SchoolParametric[]> {
    return this.parametricService.getSchools()
  }

}

import { GradeService } from './../services/grade/grade.service';
import { GradeById } from './../models/grade/gradeById.model';
import { Observable } from 'rxjs';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import 'rxjs/add/observable/of';


@Injectable({
  providedIn: 'root'
})
export class GradeByResolver implements Resolve<GradeById> {

  constructor(private gradeService: GradeService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): GradeById | Observable<GradeById> | Promise<GradeById> {
    return this.gradeService.getGradeById(route.paramMap.get('grade_id'))
  }

}

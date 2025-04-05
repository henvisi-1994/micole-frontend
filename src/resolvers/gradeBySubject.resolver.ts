import { GradeBySubject } from './../models/grade/gradeBySubject.model';
import { UserService } from './../services/user/user.service';
import { GradeService } from './../services/grade/grade.service';
import { GradeById } from './../models/grade/gradeById.model';
import { Observable } from 'rxjs';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import 'rxjs/add/observable/of';


@Injectable({
  providedIn: 'root'
})
export class GradeBySubjectResolver implements Resolve<GradeBySubject> {

  constructor(private userService: UserService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): GradeBySubject | Observable<GradeBySubject> | Promise<GradeBySubject> {
    return this.userService.getGrades(route.paramMap.get('student_id'),route.parent.parent.parent.paramMap.get('id'),route.paramMap.get('subject_id'))
  }

}

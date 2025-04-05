import { SubjectBySchoolYear } from './../models/subject/subjectBySchoolYear.model';
import { SCHOOL } from './../util/constants';
import { CourseBySchoolYear } from './../models/course/courseBySchoolYear.model';
import { SchoolService } from '../services/school/school.service';
import { Observable } from 'rxjs';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import 'rxjs/add/observable/of';


@Injectable({
  providedIn: 'root'
})
export class SubjectByTeacherResolver implements Resolve<SubjectBySchoolYear[]> {

  constructor(private schoolService: SchoolService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): SubjectBySchoolYear[] | Observable<SubjectBySchoolYear[]> | Promise<SubjectBySchoolYear[]> {
    return this.schoolService.getSubjectsByTeacher(localStorage.getItem(SCHOOL))
  }

}

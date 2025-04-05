import { SCHOOL, USER } from './../util/constants';
import { CourseBySchoolYear } from './../models/course/courseBySchoolYear.model';
import { SchoolService } from '../services/school/school.service';
import { Observable } from 'rxjs';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import 'rxjs/add/observable/of';


@Injectable({
  providedIn: 'root'
})
export class CourseByStudentResolver implements Resolve<CourseBySchoolYear[]> {

  constructor(private schoolService: SchoolService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): CourseBySchoolYear[] | Observable<CourseBySchoolYear[]> | Promise<CourseBySchoolYear[]> {
    let id = route.paramMap.get('id')
    if(!id)
      id = localStorage.getItem(USER)
    return this.schoolService.getCoursesByStudent(localStorage.getItem(SCHOOL), id)
  }

}

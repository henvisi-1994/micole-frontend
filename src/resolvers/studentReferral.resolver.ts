import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { User } from "src/models/user/user.model";
import { UserService } from "src/services/user/user.service";
import { SCHOOL } from "src/util/constants";
import { Response } from '../models/reponse.model';
import { StudentReferral } from "src/models/school/studentReferral.model";
import { StudentReferralService } from "src/services/student-referral/student-referral.service";


@Injectable({
  providedIn: 'root'
})
export class StudentReferralResolver implements Resolve<Response<StudentReferral[]>> {

  constructor(private studenReferralService: StudentReferralService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Response<StudentReferral[]> | Observable<Response<StudentReferral[]>> | Promise<Response<StudentReferral[]>> {
    return this.studenReferralService.getReferralsByPagination(1,10,"")
  }

}

import { plan } from "./../../models/parametric/plan.model";
import { roleValue } from "./../../models/parametric/roleValue.model";
import { Router } from "@angular/router";
import { Role } from "./../../models/parametric/role.model";
import { bloodType } from "./../../models/parametric/bloodType.model";
import { LoginInfo } from "./../../models/auth/loginInfo.model";
import { Component, OnInit } from "@angular/core";
import { DataService } from "src/services/data.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.sass"],
})
export class DashboardComponent implements OnInit {
  loginInfo: LoginInfo;
  hasSchool: Boolean = false;

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit(): void {
    this.dataService.breadcrumbs.next(["Menú"]);
    this.dataService.userData.subscribe((data) => {
      this.loginInfo = data;
      this.hasSchool = !!this.loginInfo.school;
    });
  }

  getSchoolImage(): String {
    if (this.loginInfo.school && this.loginInfo.school.logo) {
      return this.loginInfo.school.logo;
    } else {
      return "../../../assets/img/logo.png";
    }
  }

  canEdit(): Boolean {
    return (
      this.loginInfo.roles.includes(Role.SUPER_ADMIN) ||
      this.loginInfo.roles.includes(Role.ADMIN)
    );
  }

  editProfile() {
    this.router.navigate([
      "dashboard",
      "users",
      this.loginInfo.user.id,
      "edit",
    ]);
  }

  // getSchoolPlan(): String {
  //   return plan[this.loginInfo.school.plan]
  // }
}

import { Role } from "./../../../models/parametric/role.model";
import { SCHOOL } from "./../../../util/constants";
import { UserService } from "./../../../services/user/user.service";
import { AuthService } from "src/services/auth/auth.service";
import { DataService } from "src/services/data.service";
import { Component, OnInit } from "@angular/core";
import * as _ from "lodash";
import swal from "sweetalert2";
import { Router } from "@angular/router";

@Component({
  selector: "app-user-new",
  templateUrl: "./user-new.component.html",
  styleUrls: ["./user-new.component.sass"],
})
export class UserNewComponent implements OnInit {
  roles: string[];
  showSchools: boolean;
  constructor(
    private dataService: DataService,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.showSchools = this.authService.hasRole([Role.SUPER_ADMIN]);
    if (this.authService.hasRole([Role.SUPER_ADMIN, Role.ADMIN])) {
      this.roles = ["Orientador","Profesor", "Estudiante", "Acudiente"];
    }
    if (this.showSchools) {
      this.roles.unshift("Administrador");
    }
    this.dataService.showUserNew.next(false);
    this.dataService.breadcrumbs.next(["Usuarios", "Crear"]);
  }

  onEdit(value: any) {
    const user = { password: value.newPassword, ...value };

    this.userService
      .createUser(
        _.pick(user, [
          "firstName",
          "secondName",
          "surname",
          "lastname",
          "email",
          "mobile",
          "phone",
          "diseases",
          "description",
          "rh",
          "identificationType",
          "identification",
          "password",
          "populationGroup",
          "populationGroupOther",
          "specialFeature",
          "birthday",
          "sms",
        ]),
        value.role,
        value.school || localStorage.getItem(SCHOOL)
      )
      .subscribe(
        (data: string) => {
          swal({
            title: "Éxito",
            text: data,
            buttonsStyling: false,
            confirmButtonClass: "btn btn-success",
            type: "success",
          })
            .then((result) => {
              if (result.value) {
                this.router.navigate(["/", "dashboard", "users"]);
              }
            })
            .catch(swal.noop);
        },
        (err) => {
          swal({
            title: "Error",
            text: err,
            buttonsStyling: false,
            confirmButtonClass: "btn btn-danger",
            type: "error",
          }).catch(swal.noop);
        }
      );
  }
}

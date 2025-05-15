import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Action } from "src/models/parametric/action.model";
import { Pagination } from "src/models/parametric/pagination.model";
import { User } from "src/models/user/user.model";
import { Users } from "src/models/user/users.model";
import { UserService } from "src/services/user/user.service";
import { SCHOOL } from "src/util/constants";

@Component({
  selector: "app-update-daily-roll-call",
  templateUrl: "./update-daily-roll-call.component.html",
  styleUrls: ["./update-daily-roll-call.component.scss"],
})
export class UpdateDailyRollCallComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) {}
  students: User[] = [];
  title: string = "Estudiantes";
  subtitle: string = "Lista de estudiante para modificar asistencias";
  headers = ["Nombre Completo", "Correo Electronico", "Telefono"];

  keys = ["fullName", "email", "phone"];
  pagination: Pagination = {
    currentPage: 1,
    itemPerPage: 5,
    totalItems: 0,
    totalPages: 0,
  };
  actions: Action[];

  ngOnInit() {
    this.userService
      .getStudentsByPagination(1, 10, "", localStorage.getItem(SCHOOL))
      .subscribe(
        (response) => {
          this.students = response.data;
          this.pagination = response.pagination;
          console.log(this.pagination);
        },
        (error) => {
          console.error("Error fetching students:", error);
        }
      );
    this.actions = [
      { type: "info", action: "edit-attendance", icon: "fa fa-pencil", tooltip: "Actualizar Asistencia" },
    ];
  }
  onAction(value) {
    if (value.action == "edit-attendance") {
      const studentId = this.students[value.index].id;
      this.router.navigate([
        '/',
        'dashboard',
        'update-daily-roll-call',
        'user',
        studentId
      ]);
    }
  }
}

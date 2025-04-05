import { SCHOOL } from "./../../../util/constants";
import { Role } from "./../../../models/parametric/role.model";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "./../../../services/user/user.service";
import { Pagination } from "./../../../models/parametric/pagination.model";
import { Action } from "./../../../models/parametric/action.model";
import { DataService } from "src/services/data.service";
import { AuthService } from "src/services/auth/auth.service";
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Notification } from "src/util/notifications";

declare const $: any;

@Component({
  selector: "app-user-index",
  templateUrl: "./user-index.component.html",
  styleUrls: ["./user-index.component.sass"],
})
export class UserIndexComponent implements OnInit, OnDestroy {
  isSuperAdmin: boolean = false;
  filters: {
    key: string;
    value: string;
  }[];
  show: boolean;
  headers: string[];
  items: any[] = [];
  keys: string[];
  actions: Action[];
  pagination: Pagination = null;
  search: string = "";
  role: string = "";
  showFilter: boolean;
  isTeacher: boolean;
  isAdmin: boolean;
  userTitle: string;
  userSubtitle: string;
  userSelected: string;

  constructor(
    private authService: AuthService,
    private dataService: DataService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.filters = [];
    this.show = false;
    this.showFilter = this.route.snapshot.data["showFilter"];
    this.headers = ["Nombre", "Correo electrónico"];
    this.keys = ["fullName", "email"];
    if (
      this.authService.hasRole([Role.SUPER_ADMIN, Role.ADMIN, Role.TEACHER, Role.COUNSELOR])
    ) {
      // this.headers.push("Numero de documento");
      // this.headers.push("Celular");
      this.headers.push("Teléfono");
      // this.keys.push("identification");
      // this.keys.push("mobile");
      this.keys.push("phone");
    }

    if (
      this.authService.hasRole([Role.SUPER_ADMIN, Role.ADMIN, Role.COUNSELOR])
    ) {
      this.headers.push("Numero de documento");
      this.headers.push("Celular");
      this.keys.push("identification");
      this.keys.push("mobile");
    }

    this.actions = [
      { type: "info", action: "show", icon: "fa fa-eye", tooltip: "Consultar" },
    ];
    if (!this.showFilter) {
      this.isTeacher = this.route.snapshot.data["teacher"];
      this.isAdmin = this.route.snapshot.data["admin"];
      if (this.isTeacher && !this.isAdmin) {
        this.dataService.breadcrumbs.next(["Profesores"]);
        this.actions.push({
          type: "primary",
          action: "notification",
          icon: "fa fa-comment",
          tooltip: "Enviar mensaje",
        });
      } else if (this.isTeacher && !this.isAdmin) {
        this.dataService.breadcrumbs.next(["Coordinadores"]);
        this.actions.push({
          type: "primary",
          action: "notification",
          icon: "fa fa-comment",
          tooltip: "Enviar mensaje",
        });
      } else {
        this.dataService.breadcrumbs.next(["Estudiantes"]);
        this.actions.push({
          type: "primary",
          action: "notification",
          icon: "fa fa-comment",
          tooltip: "Enviar mensaje",
        });
      }
    } else {
      if (!this.authService.hasRole([Role.SUPER_ADMIN])) {
        this.actions.push({
          type: "primary",
          action: "notification",
          icon: "fa fa-comment",
          tooltip: "Enviar mensaje",
        });
      }
      this.dataService.breadcrumbs.next(["Usuarios"]);
    }
  }

  ngOnInit(): void {
    this.dataService.showUserNew.next(true);
    this.isSuperAdmin = this.authService.hasRole([Role.SUPER_ADMIN]);

    if (this.authService.hasRole([Role.SUPER_ADMIN, Role.ADMIN, Role.COUNSELOR])) {
      this.filters = [
        { key: "Todos", value: "" },
        { key: "Administradores", value: "ADMIN" },
        { key: "Orientadores", value: "COUNSELOR" },
        { key: "Profesores", value: "TEACHER" },
        { key: "Estudiantes", value: "STUDENT" },
        { key: "Acudientes", value: "PARENT" },
      ];
    }
    let response = this.route.snapshot.data["response"];
    this.items = response.data;
    this.pagination = response.pagination;
    this.show = true;

    if (this.authService.hasRole([Role.SUPER_ADMIN])) {
      this.userTitle = "Usuarios";
      this.userSubtitle = "Todos los usuarios de la aplicacion";
    } else if (this.authService.hasRole([Role.ADMIN, Role.COUNSELOR])) {
      this.userTitle = "Usuarios";
      this.userSubtitle = "Todos los usuarios del colegio";
    } else if (!this.showFilter && this.isTeacher && !this.isAdmin) {
      this.userTitle = "Profesores";
      this.userSubtitle = "Todos los profesores del colegio";
    } else if (!this.showFilter && this.isTeacher && this.isAdmin) {
      this.userTitle = "Coordinadores";
      this.userSubtitle = "Todos los coordinadores del colegio";
    } else {
      this.userTitle = "Estudiantes";
      this.userSubtitle = "Todos los estudiantes del colegio";
    }
  }

  changeFilter(value) {
    this.role = value;
    this.loadUsers(this.pagination.currentPage, this.search, this.role);
  }

  onAction(value) {
    if (value.action == "show") {
      this.router.navigate([
        "/",
        "dashboard",
        "users",
        this.items[value.index].id,
      ]);
    } else if (value.action == "notification") {
      this.userSelected = this.items[value.index].id;
      $("#notificationModal").modal("show");
    }
  }

  onNotification(value) {
    this.userService
      .sendNotification(
        this.userSelected,
        localStorage.getItem(SCHOOL),
        value.title,
        value.description,
        value.file
      )
      .subscribe(
        (data) => {
          Notification.show(
            "<b>Notificación</b>",
            "Hemos enviado la notificación exitosamenete al usuario",
            "bottom",
            "right",
            "success"
          );
        },
        (err) => {
          Notification.show("<b>Error</b>", err);
        }
      );
  }

  onRequest(value) {
    this.search = value.text;
    this.loadUsers(value.page, this.search, this.role);
  }

  private loadUsers(page: number, text: string, role: string) {
    let request = this.userService.getUsers(
      page,
      this.pagination.itemPerPage,
      text,
      role
    );
    if (!this.showFilter) {
      if (this.isTeacher && !this.isAdmin)
        request = this.userService.getTeachers(
          page,
          this.pagination.itemPerPage,
          text,
          localStorage.getItem(SCHOOL)
        );
      else if (this.isTeacher && this.isAdmin)
        request = this.userService.getAdmins(
          page,
          this.pagination.itemPerPage,
          text,
          localStorage.getItem(SCHOOL)
        );
      else
        request = this.userService.getStudentsByPagination(
          page,
          this.pagination.itemPerPage,
          text,
          localStorage.getItem(SCHOOL)
        );
    }
    request.subscribe((response) => {
      this.items = response.data;
      this.pagination = response.pagination;
    });
  }

  ngOnDestroy(): void {
    $("#notificationModal").modal("hide");
    $('.modal-backdrop').remove();
    $('body').removeClass('modal-open');
  }


}

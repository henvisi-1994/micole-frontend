import { UserPoint } from "./../../../models/user/userPoint.model";
import { SubjectStats } from "./../../../models/stats/subjectStats.model";
import { PeriodStats } from "./../../../models/stats/periodStats.model";
import { CourseStats } from "./../../../models/stats/courseStats.model";
import { AuthService } from "./../../../services/auth/auth.service";
import { severity } from "./../../../models/parametric/serverity.model";
import { NotificationByCourse } from "./../../../models/notification/notificationByCourse.model";
import { Action } from "./../../../models/parametric/action.model";
import { User } from "./../../../models/user/user.model";
import { Observable } from "rxjs";
import { Role } from "./../../../models/parametric/role.model";
import { Notification } from "./../../../util/notifications";
import { UserService } from "./../../../services/user/user.service";
import { bloodType } from "./../../../models/parametric/bloodType.model";
import { ActivatedRoute } from "@angular/router";
import { DataService } from "src/services/data.service";
import { identificationType } from "./../../../models/parametric/identificationType.model";
import { UserById } from "./../../../models/user/userById.model";
import { Component, OnInit } from "@angular/core";
import { UserDisabled } from "src/models/user/userDisabled.model";
import swal from "sweetalert2";
import * as moment from "moment"; // add this 1 of 4
import { GradeStats } from "src/models/stats/gradeStats.model";
import { SCHOOL } from "src/util/constants";

declare const $: any;

@Component({
  selector: "app-user-show",
  templateUrl: "./user-show.component.html",
  styleUrls: ["./user-show.component.sass"],
})
export class UserShowComponent implements OnInit {
  user: UserById;
  disabled: UserDisabled;
  notfications: NotificationByCourse[];
  showEdit: boolean
  userHeaders: string[];
  userKeys: string[];
  userAction: Action[];
  directorItems: User[];
  userItems: User[];
  showUsers: boolean = false;
  userTitle: string = "";
  userSubtitle: string = "";
  severity = severity;
  today: Date;
  currentNotification: string;
  stats: GradeStats[] = [];
  courses: CourseStats[] = [];
  periods: PeriodStats[] = [];
  subjects: SubjectStats[] = [];
  userSelected: string;
  userPoint: UserPoint;
  maxGrade: number

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private userService: UserService,
    private authService: AuthService
  ) {
    this.notfications = [];
    this.today = moment().startOf("day").toDate();
    this.maxGrade = 0
    this.showEdit = false
  }

  ngOnInit(): void {
    this.dataService.breadcrumbs.next(["Usuarios", "Información"]);
    this.dataService.showUserNew.next(true);
    this.user = this.route.snapshot.data["user"];
    this.userService.points(this.user.id).subscribe((response) => {
      this.userPoint = response;
    });
    if (this.user?.role === Role.STUDENT) {
      //Here we are going to load the notifications
      this.userService.getNotifications(this.user.id).subscribe(
        (data) => {
          this.notfications = data;
        },
        (err) => {}
      );
      this.userService.grades(this.user.id).subscribe(
        (data) => {
          this.stats = data;
        },
        (err) => {}
      );
    }
    let request: Observable<User[]>;
    this.userAction = [];
    if (this.user?.role == Role.STUDENT) {
      this.userTitle = "Acudientes";
      this.userSubtitle = "Información de los acudientes del estudiante";
      request = this.userService.getParents(this.user.id);
    } else if (this.user?.role == Role.PARENT) {
      request = this.userService.getStudents(this.user.id);
      this.userTitle = "Hijo/as";
      this.userSubtitle = "Información de los hijos del acudiente";
    }
    this.userAction = [];
    if (this.authService.hasRole([Role.ADMIN, Role.SUPER_ADMIN]))
      this.showEdit = true
      this.userAction.push({
        type: "danger",
        action: "delete",
        icon: "fa fa-trash",
        tooltip: "Borrar",
      });
    if (this.authService.hasRole([Role.ADMIN, Role.TEACHER, Role.COUNSELOR]))
      this.userAction.push({
        type: "primary",
        action: "notification",
        icon: "fa fa-comment",
        tooltip: "Enviar mensaje",
      });
    this.userHeaders = ["Nombre", "Correo electrónico"];
    this.userKeys = ["fullName", "email"];
    if (
      this.authService.hasRole([Role.SUPER_ADMIN, Role.ADMIN, Role.TEACHER, Role.COUNSELOR])
    ) {
      this.userHeaders.push("Numero de documento");
      this.userHeaders.push("Celular");
      this.userKeys.push("identification");
      this.userKeys.push("mobile");
    }
    if (!!request) {
      request.subscribe(
        (data) => {
          this.userItems = data;
          this.showUsers = true;
        },
        (err) => {}
      );
    }

    // this.disabled = this.route.snapshot.data['disabled']
    this.userService
      .getUserDisabled(this.route.snapshot.paramMap.get("id"))
      .subscribe((data) => {
        this.disabled = data;
      });
  }

  disableUser() {
    this.userService
      .disabledUser(
        this.disabled.disabled,
        this.user.id,
        this.disabled.schoolId
      )
      .subscribe(
        (data) => {
          Notification.show(
            "<b>Éxito</b>",
            "Hemos cambiado el estado del usuario",
            "bottom",
            "right",
            "success"
          );
          this.disabled.disabled = !this.disabled.disabled;
        },
        (err) => {
          Notification.show(
            "<b>Error</b>",
            "No pudimos cambiar el estado del usuario"
          );
        }
      );
  }

  getDate(date: string) {
    return moment(date).format("YYYY-MM-DD");
  }

  associateParent(value: any) {
    let request = this.userService.associateParent(this.user.id, value.id);
    if (this.user.role == Role.PARENT) {
      request = this.userService.associateStudent(this.user.id, value.id);
    }
    request.subscribe(
      (data) => {
        Notification.show("<b>Éxito</b>", data, "bottom", "right", "success");
        this.reloadData();
      },
      (err) => {
        Notification.show("<b>Error</b>", err);
      }
    );
  }

  openDischarges(id: string) {
    this.currentNotification = id;
    $("#dischargeModal").modal("show");
  }

  reloadData() {
    let request: Observable<User[]>;
    if (this.user.role == Role.STUDENT) {
      request = this.userService.getParents(this.user.id);
    } else if (this.user.role == Role.PARENT) {
      request = this.userService.getStudents(this.user.id);
    }
    request.subscribe(
      (data) => {
        this.userItems = data;
        this.showUsers = true;
      },
      (err) => {}
    );
  }

  onAction(value) {
    let message = "Acudiente";
    if (this.user.role == Role.PARENT) {
      message = "Hijo/a";
    }
    const user = this.userItems[value.index];
    if (value.action == "delete") {
      swal({
        title: `Eliminar ${message}`,
        text: `Seguro quieres borrar ${message} ?`,
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn btn-success",
        cancelButtonClass: "btn btn-danger",
        confirmButtonText: "SI",
        cancelButtonText: "NO",
        buttonsStyling: false,
      }).then((result) => {
        if (result.value) {
          let request = this.userService.deleteParent(this.user.id, user.id);
          if (this.user.role == Role.PARENT) {
            request = this.userService.deleteStudent(this.user.id, user.id);
          }
          request.subscribe(
            (data) => {
              Notification.show(
                "<b>Éxito</b>",
                data,
                "bottom",
                "right",
                "success"
              );
              this.reloadData();
            },
            (err) => {
              Notification.show("<b>Error</b>", err);
            }
          );
        }
      });
    } else if (value.action == "notification") {
      this.userSelected = user.id;
      $("#notificationModal").modal("show");
    }
  }

  onDischarge(value: any) {
    $("#dischargeModal").modal("hide");
    this.userService
      .addDischarges(this.user.id, this.currentNotification, value)
      .subscribe(
        (data) => {
          this.notfications = data;
          Notification.show(
            "<b>Éxito</b>",
            "Hemos guardado los descargos",
            "bottom",
            "right",
            "success"
          );
        },
        (err) => {
          Notification.show("<b>Error</b>", err);
        }
      );
    this.currentNotification = null;
  }

  changeGrade(id: string) {
    this.courses = this.stats.filter((x) => x.id === id)[0].courses;
    this.periods = [];
    this.subjects = [];
  }

  changeCourse(id: string) {
    var courses = this.courses.filter((x) => x.id === id)[0]
    this.maxGrade = courses.maxGrade
    this.periods = courses.periods;
    this.subjects = [];
  }

  changePeriod(id: string) {
    this.subjects = this.periods.filter((x) => x.id === id)[0].subjects;
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

  ngOnDestroy(): void {
    $("#notificationModal").modal("hide");
    $("#dischargeModal").modal("hide");
    $('.modal-backdrop').remove();
    $('body').removeClass('modal-open');
  }

}

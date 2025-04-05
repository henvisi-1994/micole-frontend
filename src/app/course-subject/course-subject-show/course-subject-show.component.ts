import { Role } from "./../../../models/parametric/role.model";
import { ROLE } from "./../../../util/constants";
import { AuthService } from "src/services/auth/auth.service";
import { User } from "src/models/user/user.model";
import { Action } from "./../../../models/parametric/action.model";
import { DataService } from "src/services/data.service";
import { Notification } from "./../../../util/notifications";
import { CourseService } from "src/services/course/course.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { CourseSubjectById } from "src/models/course-subject/courseSubjectById.model";
import swal from "sweetalert2";
import * as moment from "moment";

declare const $: any;

@Component({
  selector: "app-course-subject-show",
  templateUrl: "./course-subject-show.component.html",
  styleUrls: ["./course-subject-show.component.sass"],
})
export class CourseSubjectShowComponent implements OnInit, OnDestroy {
  courseSubject: CourseSubjectById;
  courseId: string;
  subjectId: string;
  teacherHeaders: string[];
  teacherKeys: string[];
  teacherAction: Action[];
  showTeachers: boolean = false;
  teacherItems: User[];
  userHeaders: string[];
  userKeys: string[];
  userAction: Action[];
  studentAction: Action[];
  userItems: User[] = [];
  currentUser: User;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private dataService: DataService,
    private router: Router,
    private authService: AuthService
  ) {
    this.courseSubject = route.snapshot.data["courseSubject"];
    this.courseId = route.snapshot.parent.parent.paramMap.get("id");
    this.subjectId = route.snapshot.paramMap.get("subject_id");
    this.dataService.breadcrumbs.next(["Cursos",this.courseSubject.course, "Materias",this.courseSubject.subject, "Información"]);

    this.teacherHeaders = ["Nombre", "Correo electrónico"];
    this.teacherKeys = ["fullName", "email"];
    if (
      this.authService.hasRole([Role.SUPER_ADMIN, Role.ADMIN, Role.TEACHER])
    ) {
      this.teacherHeaders.push("Numero de documento");
      this.teacherHeaders.push("Celular");
      this.teacherKeys.push("identification");
      this.teacherKeys.push("mobile");
    }

    this.teacherAction = [
      { type: "info", action: "show", icon: "fa fa-eye", tooltip: "Consultar" },
    ];
    if (this.authService.hasPermission(["CanCreateTeacher"])) {
      this.teacherAction.push({
        type: "danger",
        action: "delete",
        icon: "fa fa-trash",
        tooltip: "Borrar",
      });
    }

    this.userHeaders = ["Nombre", "Correo electrónico"];
    this.userKeys = ["fullName", "email"];
    if (
      this.authService.hasRole([Role.SUPER_ADMIN, Role.ADMIN, Role.TEACHER])
    ) {
      this.userHeaders.push("Numero de documento");
      this.userHeaders.push("Celular");
      this.userKeys.push("identification");
      this.userKeys.push("mobile");
    }
    this.studentAction = [
      { type: "info", action: "show", icon: "fa fa-eye", tooltip: "Consultar" },
    ];
    if (this.authService.hasPermission(["CanCreateComments"])) {
      this.studentAction.push({
        type: "primary",
        action: "notification",
        icon: "fa fa-exclamation-triangle",
        tooltip: "Observador",
      });
    }
  }

  ngOnInit(): void {
    this.courseService.getTeachers(this.courseId, this.subjectId).subscribe(
      (data) => {
        this.showTeachers = true;
        this.teacherItems = data;
      },
      (err) => {
        console.log(err);
      }
    );
    if (this.authService.hasRole([Role.TEACHER])) {
      this.courseService.getStudents(this.courseId).subscribe(
        (data) => {
          this.userItems = data;
        },
        (err) => {}
      );
    }
  }

  onLink(value) {
    this.courseService.addLink(this.courseId, this.subjectId, value).subscribe(
      (data) => {
        Notification.show(
          "<b>Éxito</b>",
          "Hemos actualizado el link de la clase",
          "bottom",
          "right",
          "success"
        );
        this.courseSubject = data;
      },
      (err) => {
        Notification.show("<b>Error</b>", err);
      }
    );
  }

  onAction(value, type) {
    const user = this.userItems[value.index];
    if (value.action == "notification") {
      $("#notificationModal").modal("show");
      this.currentUser = user;
    } else {
      this.router.navigate(["/", "dashboard", "users", user.id]);
    }
  }

  onUser(value) {
    this.courseService
      .associateTeacher(this.courseId, this.subjectId, value)
      .subscribe(
        (data) => {
          this.teacherItems = data;
          Notification.show(
            "<b>Éxito</b>",
            "Hemos asociado el profesor a la materia",
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

  onTeacherAction(value: any) {
    const teacher = this.teacherItems[value.index];
    if (value.action == "delete") {
      swal({
        title: "Eliminar el profesor del curso",
        text: "Seguro quieres borrar el profesor ?",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn btn-success",
        cancelButtonClass: "btn btn-danger",
        confirmButtonText: "SI",
        cancelButtonText: "NO",
        buttonsStyling: false,
      }).then((result) => {
        if (result.value) {
          this.courseService
            .deleteTeacher(this.courseId, this.subjectId, teacher.id)
            .subscribe(
              (data) => {
                this.teacherItems = data;
                Notification.show(
                  "<b>Éxito</b>",
                  "Hemos desasociado el profesor de la materia",
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
      });
    } else {
      this.router.navigate(["/", "dashboard", "users", teacher.id]);
    }
  }

  goToClasses(value) {
    this.router.navigate([
      "/",
      "dashboard",
      "courses",
      this.courseId,
      "subjects",
      this.subjectId,
      "classes",
    ]);
  }

  goToFinalGrade(value) {
    this.router.navigate([
      "/",
      "dashboard",
      "courses",
      this.courseId,
      "subjects",
      this.subjectId,
      "finalGrades",
    ]);
  }

  goToRecoveryGrade(value) {
    this.router.navigate([
      "/",
      "dashboard",
      "courses",
      this.courseId,
      "subjects",
      this.subjectId,
      "recoveryGrades",
    ]);
  }

  goToEvents(value) {
    this.router.navigate([
      "/",
      "dashboard",
      "courses",
      this.courseId,
      "events",
    ]);
  }

  onDownloadFormat(format: string) {
    this.courseService.downloadFormat(this.courseId, format).subscribe(
      (data) => {
        this.dataService.loadingScreen.next(false);
        let newBlob = new Blob([data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const url = window.URL.createObjectURL(newBlob);
        window.open(url);
      },
      (err) => {
        this.dataService.loadingScreen.next(false);
        Notification.show("<b>Error</b>", "No se pudo descargar la planilla");
      }
    );
  }

  onDownload() {
    this.courseService
      .downloadGradeBySubject(this.courseId, this.subjectId)
      .subscribe(
        (data) => {
          this.dataService.loadingScreen.next(false);
          let newBlob = new Blob([data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });
          const url = window.URL.createObjectURL(newBlob);
          window.open(url);
        },
        (err) => {
          this.dataService.loadingScreen.next(false);
          Notification.show(
            "<b>Error</b>",
            "No se pudieron descargar la planilla de notas"
          );
        }
      );
  }

  onNotification(value: any) {
    let date = null;
    if (value.appointment != null)
      date = moment(value.appointment).format("YYYY-MM-DD") + " " + value.hour;
    this.courseService
      .addNotification(
        this.courseId,
        this.currentUser.id,
        date,
        value.description,
        value.severity,
        value.action
      )
      .subscribe(
        (response) => {
          Notification.show(
            "<b>Éxito</b>",
            response,
            "bottom",
            "right",
            "success"
          );
        },
        (err) => {
          Notification.show("<b>Error</b>", err);
        }
      );
    $("#notificationModal").modal("hide");
    this.currentUser = null;
  }

  ngOnDestroy(): void {
    $("#notificationModal").modal("hide");
    $('.modal-backdrop').remove();
    $('body').removeClass('modal-open');
  }

}

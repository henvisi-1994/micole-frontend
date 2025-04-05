import { USER } from "./../../../util/constants";
import { Role } from "./../../../models/parametric/role.model";
import { AuthService } from "./../../../services/auth/auth.service";
import { User } from "./../../../models/user/user.model";
import { group } from "@angular/animations";
import { Notification } from "./../../../util/notifications";
import { showSuccess } from "src/util/validators";
import { DataService } from "src/services/data.service";
import { Action } from "./../../../models/parametric/action.model";
import { SubjectById } from "./../../../models/subject/subjectById.model";
import { ActivatedRoute, Router } from "@angular/router";
import { CourseWithSubject } from "./../../../models/course/courseWithSubject";
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CourseService } from "src/services/course/course.service";
import swal from "sweetalert2";
import * as moment from "moment";
import { of } from 'rxjs';

declare const $: any;

@Component({
  selector: "app-course-show",
  templateUrl: "./course-show.component.html",
  styleUrls: ["./course-show.component.sass"],
})
export class CourseShowComponent implements OnInit, OnDestroy {
  course: CourseWithSubject;

  subjectHeaders: string[];
  subjectKeys: string[];
  subjectItems: SubjectById[];
  subjectAction: Action[];
  showSubjects: boolean = false;

  showDirectors: boolean = false;
  showUsers: boolean = false;

  userHeaders: string[];
  userKeys: string[];
  userAction: Action[];
  studentAction: Action[];
  directorItems: User[];
  userItems: User[];
  currentUser: User;
  hasStudent: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private courseService: CourseService,
    private router: Router,
    private authService: AuthService
  ) {
    if (this.route.snapshot.queryParamMap.has("student"))
      this.hasStudent = true;
    this.dataService.breadcrumbs.next(["Cursos", "Información"]);
    this.course = this.route.snapshot.data["course"];

    this.subjectHeaders = ["Nombre", "Descripción", "Porcentaje", "Grupo"];
    this.subjectKeys = ["name", "description", "percentage", "group"];
    this.subjectAction = [
      
    ];
    if(this.authService.hasRole([Role.SUPER_ADMIN,Role.ADMIN,Role.TEACHER,Role.STUDENT,Role.PARENT])) {
      this.subjectAction.push({ type: "info", action: "show", icon: "fa fa-eye", tooltip: "Consultar" },)
    }
    if (this.authService.hasPermission([Role.SUPER_ADMIN,Role.ADMIN])) {
      this.subjectAction.push({
        type: "danger",
        action: "delete",
        icon: "fa fa-trash",
        tooltip: "Borrar",
      });
    }

    this.userHeaders = ["Nombre", "Correo electrónico"];
    this.userKeys = ["fullName", "email"];
    if (
      this.authService.hasRole([Role.SUPER_ADMIN, Role.ADMIN,Role.COUNSELOR])
    ) {
      this.userHeaders.push("Numero de documento");
      this.userHeaders.push("Celular");
      this.userKeys.push("identification");
      this.userKeys.push("mobile");
    }
    this.userAction = [
      { type: "info", action: "show", icon: "fa fa-eye", tooltip: "Consultar" },
    ];
    if (this.authService.hasRole([Role.SUPER_ADMIN, Role.ADMIN])) {
      this.userAction.push({
        type: "danger",
        action: "delete",
        icon: "fa fa-trash",
        tooltip: "Borrar",
      });
    }
    this.studentAction = [
      { type: "info", action: "show", icon: "fa fa-eye", tooltip: "Consultar" },
    ];
    if (this.authService.hasRole([Role.SUPER_ADMIN, Role.ADMIN, Role.TEACHER, Role.COUNSELOR])) {
      this.studentAction.push({
        type: "primary",
        action: "notification",
        icon: "fa fa-exclamation-triangle",
        tooltip: "Observador",
      });
    }
    if (
      this.authService.hasRole([Role.SUPER_ADMIN, Role.ADMIN, Role.TEACHER])
    ) {
      this.studentAction.push({
        type: "default",
        action: "pdf",
        icon: "fa fa-graduation-cap",
        tooltip: "Boletín",
      });

      this.studentAction.push({
        type: "default",
        action: "pdf_end",
        icon: "fa fa-file-pdf-o",
        tooltip: "Boletín final",
      });
    }

    if (this.authService.hasRole([Role.SUPER_ADMIN, Role.ADMIN])) {
      this.studentAction.push({
        type: "default",
        action: "pdf_certificate",
        icon: "fa fa-certificate",
        tooltip: "Certificado de estudio",
      });

      this.studentAction.push({
        type: "danger",
        action: "delete",
        icon: "fa fa-trash",
        tooltip: "Borrar",
      });
    }

    this.subjectItems = this.course.subjects;
    this.directorItems = this.course.directors;
    this.userItems = this.course.students;
    this.showSubjects = true;
    this.showDirectors = true;
    if (this.authService.hasRole([Role.PARENT, Role.STUDENT]))
      this.showUsers = false;
    else this.showUsers = true;
  }

  ngOnInit(): void {}

  onAssociateUserExcel(file) {
    this.courseService.associateStudents(this.course.id, file).subscribe(
      (data) => {
        const message = data;
        this.courseService
          .getCourseWithSubjectById(this.course.id)
          .subscribe((data) => {
            this.reloadData(data);
            Notification.show(
              "<b>Éxito</b>",
              message,
              "bottom",
              "right",
              "success"
            );
          });
      },
      (err) => {
        Notification.show("<b>Error</b>", err);
      }
    );
  }

  associateUser(value) {
    this.courseService
      .associateUser(this.course.id, value.role, value.id)
      .subscribe(
        (data) => {
          const message = data;
          this.courseService
            .getCourseWithSubjectById(this.course.id)
            .subscribe((data) => {
              this.reloadData(data);
              Notification.show(
                "<b>Éxito</b>",
                message,
                "bottom",
                "right",
                "success"
              );
            });
        },
        (err) => {
          Notification.show("<b>Error</b>", err);
        }
      );
  }

  associateSubject(value) {
    this.courseService
      .associateSubject(this.course.id, {
        subject: {
          id: value.id,
          groupId: value.groupId,
          percentage: value.percentage,
        },
      })
      .subscribe(
        (data) => {
          this.reloadData(data);
          Notification.show(
            "<b>Éxito</b>",
            "Hemos asociado la materia al curso",
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

  onDownload() {
    this.courseService.downloadGrade(this.course.id).subscribe(
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
          "No existen notas para descargar el boletín"
        );
      }
    );
  }

  onDownloadFormat(format: string) {
    this.courseService.downloadFormat(this.course.id, format).subscribe(
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

  onDownloadStudentAdmin() {
    this.courseService.downloadStudentAdminFormat(this.course.id).subscribe(
      (data) => {
        this.dataService.loadingScreen.next(false);
        let newBlob = new Blob([data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const url = window.URL.createObjectURL(newBlob);
        let link = document.createElement("a");
        link.href = url;
        link.download = `Estudiantes-${this.course.name}`;
        link.click();
      },
      (err) => {
        this.dataService.loadingScreen.next(false);
        Notification.show("<b>Error</b>", "No se pudo descargar la planilla");
      }
    );
  }

  onDownloadUser(value) {
    this.courseService.downloadUser(this.course.id, value).subscribe(
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

  onDownloadPdf() {
    let id = localStorage.getItem(USER);
    if (this.hasStudent) id = this.route.snapshot.queryParamMap.get("student");
    const user = this.userItems.filter(x => x.id === id)
    this.download(this.course.id, id, user.length > 0 ? user[0].fullName: "");
  }

  async onDownloadMassivePdf() {
    for (const user of this.userItems) {
      try {
        const data =  await this.courseService.downloadPdf(this.course.id, user.id).toPromise()
        this.dataService.loadingScreen.next(false);
        let newBlob = new Blob([data], { type: "application/pdf" });
        const url = window.URL.createObjectURL(newBlob);
        let link = document.createElement("a");
        link.href = url;
        link.download = `Boletin-${user.fullName}-${this.course.name}`;
        link.click();
      } catch (err) {
        this.dataService.loadingScreen.next(false);
        console.log(err)
      }
    }
  }

  async onDownloadMassivePdfEnd() {
    for (const user of this.userItems) {
      try {
        const data =  await this.courseService.downloadPdfEnd(this.course.id, user.id).toPromise()
        this.dataService.loadingScreen.next(false);
        let newBlob = new Blob([data], { type: "application/pdf" });
        const url = window.URL.createObjectURL(newBlob);
        let link = document.createElement("a");
        link.href = url;
        link.download = `Boletin-Final-${user.fullName}-${this.course.name}`;
        link.click();
      } catch (err) {
        this.dataService.loadingScreen.next(false);
        console.log(err)
      }
    }
  }

  

  onDownloadPdfEnd() {
    let id = localStorage.getItem(USER);
    if (this.hasStudent) id = this.route.snapshot.queryParamMap.get("student");
    const user = this.userItems.filter(x => x.id === id)
    this.downloadEnd(this.course.id, id, user.length > 0 ? user[0].fullName: "");
  }

  onSubjectAction(value) {
    const subject = this.subjectItems[value.index];
    if (value.action == "delete") {
      swal({
        title: "Eliminar la materia del curso",
        text: "Seguro quieres borrar la materia ?",
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
            .deleteSubject(this.course.id, subject.id)
            .subscribe(
              (data) => {
                this.reloadData(data);
                Notification.show(
                  "<b>Éxito</b>",
                  "Hemos borrado la materia del curso",
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
      if (this.hasStudent)
        this.router.navigate(
          ["/", "dashboard", "courses", this.course.id, "subjects", subject.id],
          {
            queryParams: {
              student: this.route.snapshot.queryParamMap.get("student"),
            },
          }
        );
      else
        this.router.navigate([
          "/",
          "dashboard",
          "courses",
          this.course.id,
          "subjects",
          subject.id,
        ]);
    }
  }

  private reloadData(data: CourseWithSubject) {
    this.course = data;
    this.subjectItems = this.course.subjects;
    this.userItems = this.course.students;
    this.directorItems = this.course.directors;
  }

  onAction(value: any, type: any) {
    let message = "Seguro quieres eliminar el director de curso ?";
    let user = this.directorItems[value.index];
    if (type === "user") {
      user = this.userItems[value.index];
      message = "Seguro quieres eliminar el estudiante ?";
    }
    if (value.action == "delete") {
      swal({
        title: "Eliminar la persona del curso",
        text: message,
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn btn-success",
        cancelButtonClass: "btn btn-danger",
        confirmButtonText: "SI",
        cancelButtonText: "NO",
        buttonsStyling: false,
      }).then((result) => {
        if (result.value) {
          this.courseService.deleteUser(this.course.id, user.id).subscribe(
            (data) => {
              this.reloadData(data);
              Notification.show(
                "<b>Éxito</b>",
                "Hemos borrado el usuario",
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
    } else if (value.action == "notification") {
      $("#notificationModal").modal("show");
      this.currentUser = user;
    } else if (value.action == "pdf") {
      this.download(this.course.id, user.id, user.fullName);
    } else if (value.action == "pdf_end") {
      this.downloadEnd(this.course.id, user.id, user.fullName);
    } else if (value.action == "pdf_certificate") {
      this.downloadCertificate(this.course.id, user.id, user.fullName);
    }else {
      this.router.navigate(["/", "dashboard", "users", user.id]);
    }
  }

  onNotification(value: any) {
    let date = null;
    if (value.appointment != null)
      date = moment(value.appointment).format("YYYY-MM-DD") + " " + value.hour;
    this.courseService
      .addNotification(
        this.course.id,
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

  private download(id: string, user: string, name: string) {
    this.courseService.downloadPdf(id, user).subscribe(
      (data) => {
        this.dataService.loadingScreen.next(false);
        let newBlob = new Blob([data], { type: "application/pdf" });
        const url = window.URL.createObjectURL(newBlob);
        let link = document.createElement("a");
        link.href = url;
        link.download = `Boletin-${name}-${this.course.name}`;
        link.click();
      },
      (err) => {
        this.dataService.loadingScreen.next(false);
        Notification.show(
          "<b>Error</b>",
          "No existen notas para descargar el boletín"
        );
      }
    );
  }

  private downloadEnd(id: string, user: string, name: string) {
    this.courseService.downloadPdfEnd(id, user).subscribe(
      (data) => {
        this.dataService.loadingScreen.next(false);
        let newBlob = new Blob([data], { type: "application/pdf" });
        const url = window.URL.createObjectURL(newBlob);
        let link = document.createElement("a");
        link.href = url;
        link.download = `Boletin-Final-${name}-${this.course.name}`;
        link.click();
      },
      (err) => {
        this.dataService.loadingScreen.next(false);
        Notification.show(
          "<b>Error</b>",
          "No todos los peridos se encuentra cerrados para poder hacer la descarga"
        );
      }
    );
  }

  private downloadCertificate(id: string, user: string, name: string) {
    this.courseService.downloadPdfCertificate(id, user).subscribe(
      (data) => {
        this.dataService.loadingScreen.next(false);
        let newBlob = new Blob([data], { type: "application/pdf" });
        const url = window.URL.createObjectURL(newBlob);
        let link = document.createElement("a");
        link.href = url;
        link.download = `Certificado de estudio-${name}-${this.course.name}`;
        link.click();
      },
      (err) => {
        this.dataService.loadingScreen.next(false);
        Notification.show(
          "<b>Error</b>",
          "No hay periodos terminados para descargar el boletin"
        );
      }
    );
  }


  ngOnDestroy(): void {
    $("#notificationModal").modal("hide");
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
  }

}

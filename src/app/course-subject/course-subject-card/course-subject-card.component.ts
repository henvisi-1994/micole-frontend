import { DataService } from "./../../../services/data.service";
import { CourseService } from "src/services/course/course.service";
import { USER } from "./../../../util/constants";
import { AuthService } from "./../../../services/auth/auth.service";
import { Role } from "./../../../models/parametric/role.model";
import { CourseSubjectById } from "src/models/course-subject/courseSubjectById.model";
import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Notification } from "src/util/notifications";

declare const $: any;

@Component({
  selector: "app-course-subject-card",
  templateUrl: "./course-subject-card.component.html",
  styleUrls: ["./course-subject-card.component.sass"],
})
export class CourseSubjectCardComponent implements OnInit, OnDestroy {
  @Input() courseSubject: CourseSubjectById;
  @Output() onUser: EventEmitter<string> = new EventEmitter();
  @Output() onLink: EventEmitter<string> = new EventEmitter();
  @Output() onClasses: EventEmitter<boolean> = new EventEmitter();
  @Output() onDownload: EventEmitter<boolean> = new EventEmitter();
  @Output() onEvents: EventEmitter<boolean> = new EventEmitter();
  @Output() onFinalGrade: EventEmitter<boolean> = new EventEmitter();
  @Output() onRecoveryGrade: EventEmitter<boolean> = new EventEmitter();
  @Output() onDownloadFormat: EventEmitter<string> = new EventEmitter()
  teacher = Role.TEACHER;
  id: string;
  courseId: string
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private courseService: CourseService,
    private dataService: DataService
  ) {
    if (this.authService.hasRole([Role.STUDENT])) {
      this.id = localStorage.getItem(USER);
    } else if (this.authService.hasRole([Role.PARENT])) {
      this.id = this.route.snapshot.queryParamMap.get("student");
    }
    this.courseId = this.route.snapshot.parent.parent.paramMap.get("id");

  }

  ngOnInit(): void {}

  onLinkModal() {
    $("#linkClass").modal("show");
  }

  onDownloadModal() {
    $("#downloadAttendance").modal("show");
  }

  onActionDownload(value) {
    const subjectId = this.route.snapshot.paramMap.get("subject_id");
    this.courseService
      .downloadAttendance(this.courseId, subjectId, value.year, value.month)
      .subscribe(
        (data) => {
          // console.log(data.headers.get("Content-Disposition"));
          this.dataService.loadingScreen.next(false);
          let newBlob = new Blob([data.body], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });
          const url = window.URL.createObjectURL(newBlob);
          window.open(url);
        },
        (err) => {
          this.dataService.loadingScreen.next(false);
          Notification.show(
            "<b>Error</b>",
            "No se pudieron descargar la planilla de asistencia"
          );
        }
      );
  }

  consolidateByPeriod() {

    this.courseService.consolidateByPeriod(this.courseId).subscribe(
      (data) => {
        this.dataService.loadingScreen.next(false);
        let newBlob = new Blob([data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
        const url = window.URL.createObjectURL(newBlob);
        let link = document.createElement("a");
        link.href = url;
        link.download = `Consolidado por periodo  ${this.courseSubject.course}`;
        link.click();
      },
      (err) => {
        this.dataService.loadingScreen.next(false);
        Notification.show(
          "<b>Error</b>",
          "No pudidmos descargar el consolidado por periodo"
        );
      }
    );
  }

  consolidate() {
    this.courseService.consolidate(this.courseId).subscribe(
      (data) => {
        this.dataService.loadingScreen.next(false);
        let newBlob = new Blob([data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
        const url = window.URL.createObjectURL(newBlob);
        let link = document.createElement("a");
        link.href = url;
        link.download = `Consolidado final ${this.courseSubject.course}`;
        link.click();
      },
      (err) => {
        this.dataService.loadingScreen.next(false);
        Notification.show(
          "<b>Error</b>",
          "No pudidmos descargar el consolidado final"
        );
      }
    );
  }


  onAction(value) {
    this.onLink.emit(value.link);
  }

  goToClasses() {
    // console.log(this.courseSubject)
    this.onClasses.next(true);
  }

  goToEvents() {
    this.onEvents.next(true);
  }

  goToFinalGrades() {
    this.onFinalGrade.next(true);
  }

  goToRecoveryGrades() {
    this.onRecoveryGrade.next(true);
  }

  donwloadGrades() {
    this.onDownload.next(true);
  }

  onTeacer(value) {
    this.onUser.emit(value);
  }

  downloadFormat() {
    this.onDownloadFormat.next('Task')
  }

  ngOnDestroy(): void {
    $("#linkClass").modal("hide");
    $("#downloadAttendance").modal("hide");
    $('.modal-backdrop').remove();
    $('body').removeClass('modal-open');
  }

}

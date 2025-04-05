import { DataService } from "./../../services/data.service";
import { Component, OnInit, ChangeDetectorRef, OnDestroy } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot } from "@angular/router";
import { CourseSubjectById } from "src/models/course-subject/courseSubjectById.model";

declare const $: any;

@Component({
  selector: "app-tasks",
  templateUrl: "./tasks.component.html",
  styleUrls: ["./tasks.component.sass"],
})
export class TasksComponent implements OnInit  {
  finalGrade: boolean = false;
  recoveryGrade: boolean = false;
  courseSubject: CourseSubjectById
  constructor(
    private dataService: DataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.courseSubject = this.route.snapshot.parent.data["courseSubject"];
    this.finalGrade = this.route.snapshot.data["finalGrade"];
    this.recoveryGrade = this.route.snapshot.data["recoveryGrade"];
    if (this.finalGrade) {
      this.dataService.breadcrumbs.next(["Cursos",this.courseSubject.course, "Materias",this.courseSubject.subject, "Definitiva"]);
    } else if(this.recoveryGrade) {
      this.dataService.breadcrumbs.next(["Cursos",this.courseSubject.course, "Materias",this.courseSubject.subject, "Recuperaciones"]);
    } else {
      this.dataService.breadcrumbs.next(["Cursos",this.courseSubject.course, "Materias",this.courseSubject.subject, "Tareas"]);
    }
  }

  addTask() {
    this.dataService.openTaskModal.next(true);
  }

  addFinalGrade() {
    this.dataService.openTaskFinalModal.next(true);
  }

  addRecoveryGrade() {
    this.dataService.openTaskRecoverModal.next(true);
  }

}

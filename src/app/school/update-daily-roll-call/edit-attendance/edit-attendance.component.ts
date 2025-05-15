import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import * as moment from "moment";
import { AttendanceAttachment } from "src/models/attendance/attendanceAttachment.model";
import { AttendanceForUpdate } from "src/models/attendance/attendanceForUpdate.model";
import { MyAttendace } from "src/models/attendance/myAttendance.model";
import { CourseSubjectById } from "src/models/course-subject/courseSubjectById.model";
import { Action } from "src/models/parametric/action.model";
import { Pagination } from "src/models/parametric/pagination.model";
import { AttendanceService } from "src/services/attendance/attendance.service";
import { CourseService } from "src/services/course/course.service";
import { DataService } from "src/services/data.service";
import { UserService } from "src/services/user/user.service";
import { Notification } from "src/util/notifications";
import swal from "sweetalert2";

@Component({
  selector: "app-edit-attendance",
  templateUrl: "./edit-attendance.component.html",
  styleUrls: ["./edit-attendance.component.scss"],
})
export class EditAttendanceComponent implements OnInit {
  courseSubject: CourseSubjectById;
  date: string;
  today: moment.Moment = moment();
  current: moment.Moment = moment();
  maxDate: Date = moment().startOf("day").toDate();
  id: string;
  onlyFile: boolean;
  isUrl: boolean;
  attendances: MyAttendace[];
  title: string = "Lista de Asistencia";
  subtitle: string = "Lista de  asistencias de Estudiantes";
  headers = ["Tipo", "Fecha", "Materia"];
  attendanceUpdate: AttendanceForUpdate = new AttendanceForUpdate();
  attendanceAttachment: AttendanceAttachment = new AttendanceAttachment();
  attendanceType: string = "";
  attendanceLabels: { [key: string]: string } = {
    NOATTENDANCE: "No asistió",
    DELAY: "Retardo",
    ATTENDANCE: "Asistió",
    EVASION: "Evasión",
    SCHOOL_UNIFORM: "Mal uso del uniforme",
    JUSTIFIED_NOATTENDANCE: "No asistencia con justificación",
  };

  keys = ["value", "day", "subject"];
  pagination: Pagination = {
    currentPage: 1,
    itemPerPage: 5,
    totalItems: 0,
    totalPages: 0,
  };
  actions: Action[];
  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private courseService: CourseService,
    private userService: UserService,
    private attendanceService: AttendanceService
  ) {}

  ngOnInit(): void {
    this.onlyFile = false;
    this.isUrl = false;
    if (this.route.snapshot.paramMap.has("id")) {
      this.id = this.route.snapshot.paramMap.get("id");
      this.loadAttendance();
      this.actions = [
        {
          type: "info",
          action: "update-attendance",
          icon: "fa fa-pencil",
          tooltip: "Actualizar Asistencia",
        },
        {
          type: "info",
          action: "attach-attendance",
          icon: "fa fa-paperclip ",
          tooltip: "Añadir evidencia",
        },
      ];
    }
  }
  handleUpload(event: {
    isUrl: boolean;
    value: { name: string; description: string; file?: File; url?: string };
  }) {
    this.attendanceAttachment.isUrl = event.isUrl;
    this.attendanceAttachment.name = event.value.name;
    this.attendanceAttachment.description = event.value.description;
    if (event.isUrl) {
      this.attendanceAttachment.file = null;
      this.attendanceAttachment.url = event.value.url;
    } else {
      this.attendanceAttachment.file = event.value.file;
      this.attendanceAttachment.url = null;
    }
    this.attendanceService
      .attachmentAttendance(this.attendanceAttachment)
      .subscribe(
        (data) => {
          Notification.show(
            "<b>Asistencia Actualizada</b>",
            "La asistencia fue actualizada correctamente"
          );
          this.loadAttendance();
        },
        (err) => {
          Notification.show("<b>Error</b>", err);
        }
      );
  }
  abrirModal() {
    ($("#fileModal") as any).modal("show");
  }

  onAction(value) {
    if (value.action == "update-attendance") {
      this.attendanceUpdate.id = this.attendances[value.index].id;
      if (this.attendanceUpdate.value.length === 0) {
        swal({
          title: "Error",
          text: "Debe escoger un tipo de asistencia",
          buttonsStyling: false,
          confirmButtonClass: "btn btn-danger",
          type: "error",
        });
      } else {
        this.attendanceService
          .updateAttendance(this.attendanceUpdate)
          .subscribe((data) => {
            Notification.show(
              "<b>Asistencia Actualizada</b>",
              "La asistencia fue actualizada correctamente"
            );
            this.loadAttendance();
          });
      }
    }
    if (value.action == "attach-attendance") {
      this.attendanceAttachment.id = this.attendances[value.index].id;
      this.abrirModal();
    }
  }
  loadAttendance() {
    this.userService
      .getAttendance(this.id, this.current.format("YYYY-MM-DD"))
      .subscribe(
        (data) => {
          this.attendances = data;
        },
        (err) => {
          Notification.show("<b>Error</b>", err);
        }
      );
  }

  setValue(value: string) {
    this.attendanceUpdate.value = value;
    this.attendanceType = this.attendanceLabels[value];
  }

  onDate(event: any) {
    this.current = moment(event.value);
    this.loadAttendance();
  }
}

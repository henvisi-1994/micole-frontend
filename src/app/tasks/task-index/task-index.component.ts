import { TaskService } from "./../../../services/task/task.service";
import { Notification } from "./../../../util/notifications";
import { catchError, mergeMap } from "rxjs/operators";
import { Task } from "./../../../models/task/task.model";
import { CourseService } from "./../../../services/course/course.service";
import { ActivatedRoute, Router } from "@angular/router";
import { DataService } from "src/services/data.service";
import { Component, OnDestroy, OnInit } from "@angular/core";
import * as moment from "moment"; // add this 1 of 4
import { TaskInfo } from "src/models/task/taskInfo.model";
import swal from "sweetalert2";
import { FormControl, FormGroup, Validators } from '@angular/forms';

declare const $: any;

@Component({
  selector: "app-task-index",
  templateUrl: "./task-index.component.html",
  styleUrls: ["./task-index.component.sass"],
})
export class TaskIndexComponent implements OnInit, OnDestroy {
  subjectId: string;
  courseId: string;
  tasks: Task[];
  modalText: string;
  modalButton: string;
  showPeriods: boolean;
  currentTask: TaskInfo;
  finalGrade: boolean;
  recoveryGrade: boolean;
  fileForm: FormGroup
  periodId: string


  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private courseService: CourseService,
    private taskService: TaskService,
    private router: Router
  ) {
    this.periodId = ""
    this.subjectId = this.route.snapshot.paramMap.get("subject_id");
    this.courseId = this.route.snapshot.parent.parent.parent.paramMap.get("id");
    this.tasks = this.route.snapshot.data["tasks"];
    this.finalGrade = this.route.snapshot.data["finalGrade"];
    this.recoveryGrade = this.route.snapshot.data["recoveryGrade"]
  }

  ngOnInit(): void {
    // this.dataService.showNewTask.next(true);
    this.initForm()
    this.dataService.openTaskModal.subscribe((data) => {
      if (data) {
        this.modalText = "Crear Tarea";
        this.modalButton = "Crear";
        this.showPeriods = true;
        this.currentTask = null;
        $("#taskModal").modal("show");
      }
      else {
        $("#taskModal").modal("hide");
      }
    });
    this.dataService.openTaskFinalModal.subscribe((data) => {
      if (data) {
        $("#taskFinalModal").modal("show");
      }
      else {
        $("#taskFinalModal").modal("hide");
      }
    });
    this.dataService.openTaskRecoverModal.subscribe((data) => {
      if (data) {
        $("#taskRecoveryModal").modal("show");
      }
      else {
        $("#taskRecoveryModal").modal("hide");
      }
    });
  }

  onFinalGrade(value: any) {
    this.courseService
      .addFinalGrade(this.courseId, this.subjectId, value.periodId)
      .subscribe(
        (data) => {
          this.dataService.openTaskFinalModal.next(false);
          Notification.show(
            "<b>Éxito</b>",
            "Hemos creado la definitiva",
            "bottom",
            "right",
            "success"
          );
          this.onShow(data);
        },
        (err) => {
          Notification.show("<b>Error</b>", err);
        }
      );
  }

  downloadTemplate(periodId: string) {
    this.courseService.downloadTasksTemplate(this.courseId, periodId, this.subjectId).subscribe(
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

  uploadTemplate(periodId: string) {
    this.periodId = periodId
    $('#excelMassiveModal').modal('show')
  }

  onRecoveryGrade(value: any) {
    this.courseService
      .addRecoveryGrade(this.courseId, this.subjectId, value.periodId)
      .subscribe(
        (data) => {
          this.dataService.openTaskRecoverModal.next(false);
          Notification.show(
            "<b>Éxito</b>",
            "Hemos creado la recuperación",
            "bottom",
            "right",
            "success"
          );
          this.onShow(data);
        },
        (err) => {
          Notification.show("<b>Error</b>", err);
        }
      );
  }

  onTask(value: any) {
    value.taskDate = moment(value.taskDate).format("YYYY-MM-DD");
    let request = this.courseService.addTask(
      this.courseId,
      this.subjectId,
      value
    );
    if (this.currentTask) {
      request = this.taskService.updateTask(this.currentTask.id, value);
    }
    request.subscribe(
      (data) => {
        this.dataService.openTaskModal.next(false);
        if (this.currentTask) {
          this.courseService
            .getTasks(this.courseId, this.subjectId)
            .subscribe((tasks) => {
              this.tasks = tasks;
              Notification.show(
                "<b>Éxito</b>",
                "Hemos actualizado la tarea",
                "bottom",
                "right",
                "success"
              );
            });
        } else {
          this.onShow(data);
        }
      },
      (err) => {
        Notification.show("<b>Error</b>", err);
      }
    );
  }

  onShow(id: string) {
    this.router.navigate(["/", "dashboard", "tasks", id]);
  }

  onEdit(task: TaskInfo) {
    this.modalText = "Editar Tarea";
    this.modalButton = "Actualizar";
    this.showPeriods = false;
    this.currentTask = task;
    $("#taskModal").modal("show");
  }

  onDelete(task: TaskInfo) {
    swal({
      title: "Eliminar tareaa",
      text: `Seguro quieres borrar la  ${task.name} ?`,
      type: "warning",
      showCancelButton: true,
      confirmButtonClass: "btn btn-success",
      cancelButtonClass: "btn btn-danger",
      confirmButtonText: "SI",
      cancelButtonText: "NO",
      buttonsStyling: false,
    }).then((result) => {
      if (result.value) {
        this.taskService
          .deleteTask(task.id)
          .pipe(
            mergeMap((response) => {
              return this.courseService.getTasks(this.courseId, this.subjectId);
            })
          )
          .subscribe(
            (data) => {
              this.tasks = data;
              Notification.show(
                "<b>Éxito</b>",
                "Hemos borrado la tarea",
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
  }

  ngOnDestroy(): void {
    this.dataService.openTaskModal.next(false);
    this.dataService.openTaskFinalModal.next(false);
    $("#taskModal").modal("hide");
    $("#excelMassiveModal").modal("hide");
    $("#taskFinalModal").modal("hide");
    $('.modal-backdrop').remove();
    $('body').removeClass('modal-open');
  }

  extensions() {
      return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
    }
  
  onSubmit() {
    $('#excelMassiveModal').modal('hide')
    console.log(this.periodId)
    this.courseService.uploadTasksTemplate(this.courseId, this.periodId, this.subjectId, this.fileForm.value['fileSource'])
    .subscribe(data => {
      Notification.show("<b>Éxito</b>",data,"bottom","right","success")

    },err => {
      Notification.show("<b>Error</b>", err);
    })
    this.periodId = ""
    this.fileForm.reset();
   
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.fileForm.patchValue({
        fileSource: file
      });
    }
  }

  private initForm() {
    this.fileForm = new FormGroup({
      file: new FormControl('',[Validators.required]),
      fileSource: new FormControl('',[Validators.required])
    })
  }

  
}

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Role } from './../../../models/parametric/role.model';
import { AuthService } from 'src/services/auth/auth.service';
import { DataService } from 'src/services/data.service';
import { mergeMap, catchError } from 'rxjs/operators';
import { ScoreService } from './../../../services/score/score.service';
import { Score } from './../../../models/score/score.model';
import { Notification } from './../../../util/notifications';
import { TaskService } from './../../../services/task/task.service';
import { attachmentType } from './../../../models/parametric/attachmentType.model';
import { TaskById } from './../../../models/task/taskById.model';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import swal from 'sweetalert2';
import * as moment from 'moment';

declare const $: any;

@Component({
  selector: 'app-task-show',
  templateUrl: './task-show.component.html',
  styleUrls: ['./task-show.component.sass']
})
export class TaskShowComponent implements OnInit, OnDestroy {
  task: TaskById
  type = attachmentType
  modalTitle: string
  gradeTitle: string
  isUrl: boolean
  currentScore: Score
  onlyFile: boolean
  score: Score
  fileForm: FormGroup

  constructor(private route: ActivatedRoute,
    private taskService: TaskService, private scoreService: ScoreService,
    private dataService: DataService, private authService: AuthService) {
    this.task = route.snapshot.data['task']
    this.modalTitle = 'Subir archivo'
    this.gradeTitle = 'Crear calificación'
    this.dataService.breadcrumbs.next(['Tareas','Información'])
    this.onlyFile = false
  }

  ngOnInit(): void {
    this.loadScore()
    this.initForm()
  }

  getIcon(type) {
    console.log(type)
    switch(type) {
      case "PDF":
      case "pdf":
        return "fa-file-pdf-o"
      case "IMAGE":
      case "png":
      case "jpg":
      case "jpeg":
        return "fa-image"
      case "VIDEO":
      case "mp4":
        return "fa-file-video-o"
      case "URL":
        return "fa-link"
      case "AUDIO":
      case "mp3":
        return "fa-file-audio-o"
      case "WORD":
      case "docx":
      case "doc":
        return "fa-file-word-o"
      case "EXCEL":
      case "xlsx":
      case "xls":
        return "fa-file-excel-o"
      default:
        return "fa-link"
    }
  }

  openModal(value: boolean) {
    this.isUrl = value
    if(value) {
      this.modalTitle = 'Subir url'
    } else {
      this.modalTitle = 'Subir archvio'
    }
    if(this.authService.hasRole([Role.STUDENT])) {
      this.onlyFile = true
    } else {
      this.onlyFile = false
    }
    $('#fileModal').modal('show')
  }

  openModalExcel() {
    $('#excelModal').modal('show')
  }

  onUpload(value: any) {
    $('#fileModal').modal('hide')
    if(this.onlyFile) {
      this.taskService.answerTask(this.task.id, value.value.file)
        .subscribe(data => {
          Notification.show("<b>Éxito</b>",data,"bottom","right","success")
          this.loadScore()
        }, err => {
          Notification.show("<b>Error</b>",err)
        })
    } else {
      this.taskService.uploadFile(this.task.id,value.isUrl, value.value)
      .subscribe(data => {
        this.task = data
        Notification.show("<b>Éxito</b>","Hemos subido el adjunto","bottom","right","success")
      }, err => {
        Notification.show("<b>Error</b>",err)
      })
    }

  }

  onDelete(id: string, name: string) {
    swal({
      title: 'Eliminar el adjunto',
      text: `Seguro quieres eliminar el adjunto ${name} ?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      confirmButtonText: 'SI',
      cancelButtonText: "NO",
       buttonsStyling: false
    }).then((result) => {
      if (result.value) {
        this.taskService.deleteAttachment(this.task.id,id)
        .subscribe(data => {
          this.task = data
          Notification.show("<b>Éxito</b>","Hemos borrado el adjunto","bottom","right","success")
        }, err => {
          Notification.show("<b>Error</b>",err)
        })
      }
    })
  }

  getColor(value: Score) {
    if(value.value != null) {
      return {"graded": true};
    } else if (value.url != null) {
      return {"not-grade": true};
    } else {
      return {"not-url": true};
    }
  }

  openGradeModal(score: Score) {
    this.currentScore = score
    if(score.value) {
      this.gradeTitle = 'Actualizar la calificación'
    } else {
      this.gradeTitle = 'Crear calificación'
    }
    $('#gradeModal').modal('show')
  }

  onGrade(value: any) {
    this.scoreService.updateScore(this.currentScore.id, value)
      .pipe(mergeMap(response => {
        return this.taskService.getTaskById(this.task.id)
      })).subscribe(data => {
        this.task = data;
        Notification.show("<b>Éxito</b>","Hemos actualizado la nota del estudiante","bottom","right","success")
      }, err => {
        Notification.show("<b>Error</b>", err);
      })
    $('#gradeModal').modal('hide')
  }

  canDelete() {
    return this.authService.hasPermission(['Teacher'])
      && moment().startOf('day').isSameOrBefore(moment(this.task.taskDate).startOf('day'))
  }

  loadScore() {
    if(this.authService.hasRole([Role.STUDENT])) {
      this.taskService.getScore(this.task.id)
        .subscribe(data => {
          this.score = data
        }, err => {
          this.score = null
        })
    }
  }

  extensions() {
    return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
  }

  onSubmit() {
    $('#excelModal').modal('hide')
    this.scoreService.uploadExcel(this.route.snapshot.params['id'], this.fileForm.value['fileSource'])
      .subscribe(data => {
        this.taskService.getTaskById(this.route.snapshot.params['id']).subscribe(task => {
          this.task = task
          Notification.show("<b>Éxito</b>",data,"bottom","right","success")
        })
      },err => {
        Notification.show("<b>Error</b>", err);
      })
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

  ngOnDestroy(): void {
    $("#excelModal").modal("hide");
    $("#fileModal").modal("hide");
    $("#gradeModal").modal("hide");
    $('.modal-backdrop').remove();
    $('body').removeClass('modal-open');
  }


}

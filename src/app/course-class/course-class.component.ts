import { CourseClass } from './../../models/course-class/courseClass.model';
import { CourseService } from './../../services/course/course.service';
import { ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { DataService } from 'src/services/data.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Notification } from 'src/util/notifications';
import swal from 'sweetalert2';
import { CourseSubjectById } from 'src/models/course-subject/courseSubjectById.model';

declare const $: any;

@Component({
  selector: 'app-course-class',
  templateUrl: './course-class.component.html',
  styleUrls: ['./course-class.component.sass']
})
export class CourseClassComponent implements OnInit, OnDestroy {
  classes: CourseClass[]
  modalTitle: string
  classValue: CourseClass
  courseId: string
  subjectId: string
  courseSubject: CourseSubjectById

  constructor(private dataService: DataService, private route: ActivatedRoute,
    private courseService: CourseService) {
    this.courseSubject = route.snapshot.parent.data["courseSubject"];
    this.dataService.breadcrumbs.next(['Cursos',this.courseSubject.course,'Materias',this.courseSubject.subject,'Clases'])
    this.classes = route.snapshot.data['classes']
    this.modalTitle = "Subir clase"
    this.classValue = null
    this.courseId = route.snapshot.parent.parent.paramMap.get('id')
    this.subjectId = route.snapshot.paramMap.get('subject_id')
  }

  ngOnInit(): void {
  }

  onUpload(value) {
    if(this.classValue == null) {
      this.courseService.uploadClass(this.courseId, this.subjectId, value)
      .subscribe(data => {
        this.classes = data
        Notification.show("<b>Éxito</b>","Subimos la clase exitosamente","bottom","right","success")
      }, err => {
        Notification.show("<b>Error</b>", err)
      })
    } else {
      this.courseService.updateClass(this.classValue.id, this.courseId, this.subjectId, value)
      .subscribe(data => {
        this.classes = data
        Notification.show("<b>Éxito</b>","Hemos actualizado la clase exitosamente","bottom","right","success")
      }, err => {
        Notification.show("<b>Error</b>", err)
      })
      this.classValue = null
    }

  }

  editClass(c) {
    this.classValue = c
    this.modalTitle = "Actualizar clase"
    $('#uploadClass').modal('show')
  }

  deleteClass(c: CourseClass) {
    swal({
      title: 'Eliminar la claase',
      text: `Seguro quieres eliminar la clase del ${c.date} ?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      confirmButtonText: 'SI',
      cancelButtonText: "NO",
       buttonsStyling: false
    }).then((result) => {
      if (result.value) {
        this.courseService.deleteClass(c.id, this.courseId, this.subjectId)
        .subscribe(data => {
          this.classes = data
          Notification.show("<b>Éxito</b>","Hemos borrado la clase","bottom","right","success")
        }, err => {
          Notification.show("<b>Error</b>",err)
        })
      }
    })
  }

  openModal() {
    this.modalTitle = "Subir clase"
    this.classValue = null
    $('#uploadClass').modal('show')
  }

  ngOnDestroy(): void {
    $("#uploadClass").modal("hide");
    $('.modal-backdrop').remove();
  }

}

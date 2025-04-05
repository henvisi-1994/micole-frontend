import { AuthService } from './../../services/auth/auth.service';
import { Calendar } from './../../models/calendar.model';
import { Notification } from './../../util/notifications';
import { CourseService } from './../../services/course/course.service';
import { ActivatedRoute } from '@angular/router';
import { DataService } from './../../services/data.service';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import swal from 'sweetalert2';
import * as moment from 'moment'; // add this 1 of 4
import { CourseSubjectById } from 'src/models/course-subject/courseSubjectById.model';

declare const $: any

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.sass']
})
export class TimetableComponent implements OnInit, OnDestroy {
  subjectId: string
  courseId: string
  events: any[] = []
  show: boolean = false
  canEdit: boolean = false
  courseSubject: CourseSubjectById
  constructor(private dataService: DataService, private route: ActivatedRoute,
    private courseService: CourseService, private authService: AuthService) {
    this.courseSubject = route.snapshot.parent.data["courseSubject"];
    this.dataService.breadcrumbs.next(['Cursos',this.courseSubject.course,'Materias',this.courseSubject.subject,'Horarios'])
    this.subjectId = this.route.snapshot.paramMap.get('subject_id');
    this.courseId = this.route.snapshot.parent.parent.parent.paramMap.get('id');
    this.canEdit = this.authService.hasPermission(['CanCreateTimetable'])
  }

  ngOnInit() {
    this.loadData(moment().format('YYYY-MM-DD'), moment().add(1,'days').format('YYYY-MM-DD'))
  }

  onCreate(value: any) {
    this.courseService.createTimetable(this.courseId,this.subjectId, value)
      .subscribe(data => {
        window.location.reload()
      }, err => {
        Notification.show("<b>Error</b>",err)
      })
  }

  openMassiveCreation() {
    $('#associteStudentModal').modal('show')
  }

  onCreateTimetable(file: File) {
    $('#associteStudentModal').modal('hide')
    this.courseService.createTimetableMassive(this.courseId, this.subjectId, file)
      .subscribe(data => {
        window.location.reload()
      }, err => {
        Notification.show("<b>Error</b>",err)
      })
  }

  onReload(value: any) {
    this.loadData(value.start, value.end)
  }

  onDelete(value: string) {
    swal({
      title: 'Eliminar el horario',
      text: "Seguro quieres borrar el horario ?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      confirmButtonText: 'SI',
      cancelButtonText: "NO",
       buttonsStyling: false
    }).then((result) => {
      if (result.value) {
        this.courseService.deleteTimetable(value)
        .subscribe(data => {
          window.location.reload()
        }, err => {
          Notification.show("<b>Error</b>",err)
        })
      }
    })
  }

  private loadData(start: string, end: string) {
    this.courseService.getTimetables(this.courseId,start,end,this.subjectId)
      .subscribe(data => {
        this.events = data
        this.show = true
      }, err => {
        Notification.show("<b>Error</b>",err)
      })
  }

  ngOnDestroy(): void {
    $("#associteStudentModal").modal("hide");
    $('.modal-backdrop').remove();
    $('body').removeClass('modal-open');
  }

}

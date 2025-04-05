import { CourseService } from 'src/services/course/course.service';
import { Notification } from './../../../util/notifications';
import { attendaceValue } from './../../../models/parametric/attendaceValue.model';
import { Attendace } from './../../../models/attendance/attendance.model';
import { User } from './../../../models/user/user.model';
import { ActivatedRoute } from '@angular/router';
import { DataService } from './../../../services/data.service';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import swal from 'sweetalert2';
import { CourseSubjectById } from 'src/models/course-subject/courseSubjectById.model';

@Component({
  selector: 'app-attendace-index',
  templateUrl: './attendace-index.component.html',
  styleUrls: ['./attendace-index.component.sass']
})
export class AttendaceIndexComponent implements OnInit {
  courseSubject: CourseSubjectById
  students: User[]
  values: string[]
  attendances: Attendace[]
  date: string
  today: moment.Moment
  current: moment.Moment
  maxDate: Date
  subjectId: string
  courseId: string

  constructor(private dataService: DataService, private route: ActivatedRoute,
    private courseService: CourseService) {
    this.subjectId = route.snapshot.paramMap.get('subject_id');
    this.courseId = route.snapshot.parent.parent.parent.paramMap.get('id');
    this.courseSubject = route.snapshot.parent.data["courseSubject"];
    this.dataService.breadcrumbs.next(['Cursos',this.courseSubject.course,'Materias',this.courseSubject.subject,'Asistencia'])
    this.students = route.snapshot.data['students']
    this.attendances = route.snapshot.data['attendances']
    this.values = new Array(this.students.length).fill("")
    this.today = moment()
    this.current = moment()
    this.maxDate = moment().startOf('day').toDate()

    if(this.today.startOf('day').isSame(this.current.startOf('day')) && this.attendances.length === 0) {
      this.values = this.values.map(x => 'ATTENDANCE')
    }

  }

  getAttendance(id: string) {
    const temp = this.attendances.filter(x => x.userId === id);
    if(temp.length > 0)
      return attendaceValue[temp[0].value]
    return "No se ha tomado la asistencia"
  }

  showAtttendance(id: string) {
    const temp = this.attendances.filter(x => x.userId === id);
    return temp.length === 0 && this.current.startOf('day').isSame(this.today.startOf('day'))
  }

  setValue(index: number, value: string) {
    this.values[index] = value
  }

  getValue(index: number) {
    return attendaceValue[this.values[index]] || "No valor seleccionado"
  }

  showButton() {
    return this.current.startOf('day').isSame(this.today.startOf('day')) && this.attendances.length === 0
  }

  noSelectedAttendance(): boolean {
    const filteredValues = this.values.filter(x => x.length === 0)
    return filteredValues.length === this.values.length
  }

  ngOnInit(): void {
  }

  takeAttendance() {
    let users = this.students.map((element, index) => {
      if(this.values[index].length > 0)
        return {
          userId: element.id,
          allDay: false,
          value: this.values[index]
        }
      return undefined
    })
    users = users.filter(x => x != undefined)
    swal({
      title: 'Tomar asistencia',
      text: "Seguro quieres guardar la asistencia, después de tomada no sé podra cambiar",
      type: 'warning',
      showCancelButton: true,
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      confirmButtonText: 'SI',
      cancelButtonText: "NO",
       buttonsStyling: false
    }).then((result) => {
      if (result.value) {
        this.courseService.takeAttendace(this.courseId, this.subjectId, this.today.format('YYYY-MM-DD'),users)
          .subscribe(response => {
            this.attendances = response
            this.values.fill("")
            Notification.show("<b>Éxito</b>","Hemos tomado la asistencia correctamente","bottom","right","success")
          }, err => {
            Notification.show("<b>Error</b>",err)
          })

      }
    })
  }

  onDate(value: any) {
    this.current = moment(value.value)
    this.courseService.getAttendances(this.courseId,this.subjectId, this.current.format('YYYY-MM-DD'))
      .subscribe(data => {
        this.attendances = data
        if(this.today.startOf('day').isSame(this.current.startOf('day')) && this.attendances.length === 0) {
          this.values = this.values.map(x => 'ATTENDANCE')
        }
      }, err => {
        Notification.show("<b>Error</b>",err)
      })
  }

}

import { Calendar } from './../../../models/calendar.model';
import { Observable } from 'rxjs';
import { Role } from './../../../models/parametric/role.model';
import { AuthService } from 'src/services/auth/auth.service';
import { DataService } from './../../../services/data.service';
import { Notification } from './../../../util/notifications';
import { CourseService } from 'src/services/course/course.service';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment'; // add this 1 of 4
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-my-timetable',
  templateUrl: './my-timetable.component.html',
  styleUrls: ['./my-timetable.component.sass']
})
export class MyTimetableComponent implements OnInit {
  show: boolean
  events: any[]
  constructor(private courseService: CourseService, private dataService: DataService,
    private router: Router, private authService: AuthService, private route: ActivatedRoute) {

    if(this.route.snapshot.queryParamMap.has('student'))
      this.dataService.breadcrumbs.next(['Horario', this.route.snapshot.queryParamMap.get('name')])
    else
      this.dataService.breadcrumbs.next(['Mi horario'])
  }

  ngOnInit(): void {
    this.loadData(moment().format('YYYY-MM-DD'), moment().add(1,'days').format('YYYY-MM-DD'))
  }

  onReload(value: any) {
    this.loadData(value.start, value.end)
  }

  onShow(value: any) {
    if(value.url) {
      window.open(value.url, "_blank");
    }
    this.router.navigate(['/','dashboard','courses',value.course,'subjects',value.subject])
  }

  private loadData(start: string, end: string) {
    let request: Observable<Calendar[]>
    if(this.authService.hasRole([Role.TEACHER,Role.STUDENT])) {
      request = this.courseService.getTeacherTimetable(start,end)

    } else {
      request = this.courseService.getTimetableByStudentId(this.route.snapshot.queryParamMap.get('student'),start,end)
    }
    request.subscribe(data => {
      this.events = data
      this.show = true
    }, err => {
      Notification.show("<b>Error</b>",err)
    })
  }

}

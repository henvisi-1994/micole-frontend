import { attendaceValue } from './../../../models/parametric/attendaceValue.model';
import { Notification } from './../../../util/notifications';
import { USER } from './../../../util/constants';
import { DataService } from 'src/services/data.service';
import { UserService } from './../../../services/user/user.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MyAttendace } from 'src/models/attendance/myAttendance.model';
import * as moment from 'moment';
import 'moment/locale/es'  // without this line it didn't work

@Component({
  selector: 'app-my-attendance',
  templateUrl: './my-attendance.component.html',
  styleUrls: ['./my-attendance.component.sass']
})
export class MyAttendanceComponent implements OnInit {
  attendances: MyAttendace[]
  id: string
  current: moment.Moment
  maxDate: Date
  attendaceValue = attendaceValue

  constructor(private route: ActivatedRoute, private userService: UserService,
    private dataService: DataService)
  {
    this.attendances = route.snapshot.data['response']
    if(this.route.snapshot.paramMap.has('id'))
      this.dataService.breadcrumbs.next(['Asistencia', this.route.snapshot.queryParamMap.get('name')])
    else
      this.dataService.breadcrumbs.next(['Mi asistencia'])
    this.id = localStorage.getItem(USER)
    this.current = moment()
    moment.locale('es')
    this.maxDate =  moment().startOf('day').toDate()
    if(route.snapshot.paramMap.has('id'))
      this.id = route.snapshot.paramMap.get('id')
  }

  ngOnInit(): void {
  }

  onDate(value: any) {
    this.current = moment(value.value)
    this.userService.getAttendance(this.id, this.current.format('YYYY-MM-DD'))
      .subscribe(data => {
        this.attendances = data
      }, err => {
        Notification.show("<b>Error</b>",err)
      })
  }

}

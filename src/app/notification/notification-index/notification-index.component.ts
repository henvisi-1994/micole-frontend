import { Role } from './../../../models/parametric/role.model';
import { severity } from './../../../models/parametric/serverity.model';
import { AuthService } from 'src/services/auth/auth.service';
import { NotificationByCourse } from './../../../models/notification/notificationByCourse.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment'; // add this 1 of 4

@Component({
  selector: 'app-notification-index',
  templateUrl: './notification-index.component.html',
  styleUrls: ['./notification-index.component.sass']
})
export class NotificationIndexComponent implements OnInit {
  @Input() notfications: NotificationByCourse[]
  @Output() onDischarge: EventEmitter<string> = new EventEmitter()
  severity = severity
  today: Date

  constructor(private authService: AuthService) {
    this.today = moment().startOf('day').toDate()

  }

  ngOnInit(): void {
  }

  // getDate(date: string) {
  //   return moment(date).format('YYYY-MM-DD')
  // }

  getSeverity(name: string) {
    return this.severity[name]
  }

  showDischarges(date: string, studentDischarges: string, parentDischarges: string): boolean {
    return ((this.authService.hasRole([Role.STUDENT]) && studentDischarges.length === 0) ||
      (this.authService.hasRole([Role.PARENT]) && parentDischarges.length === 0))
  }

  openDischarges(id: string) {
    this.onDischarge.emit(id)
  }

}

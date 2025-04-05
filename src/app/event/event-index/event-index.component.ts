import { AuthService } from 'src/services/auth/auth.service';
import { CourseService } from 'src/services/course/course.service';
import { Notification } from './../../../util/notifications';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/services/data.service';
import { Component, OnInit } from '@angular/core';
import { UpcomingEvent } from 'src/models/event/upcomingEvent.model';
import swal from 'sweetalert2';
import * as moment from 'moment';


@Component({
  selector: 'app-event-index',
  templateUrl: './event-index.component.html',
  styleUrls: ['./event-index.component.sass']
})
export class EventIndexComponent implements OnInit {
  upcomingEvent: UpcomingEvent

  constructor(private dataService: DataService, private route: ActivatedRoute,
    private courseService: CourseService, private authService: AuthService) {
    if(this.route.snapshot.data['isStudent'])
      this.dataService.breadcrumbs.next(['Eventos'])
    else
      this.dataService.breadcrumbs.next(['Eventos',this.route.snapshot.queryParamMap.get('name')])
    this.upcomingEvent = this.route.snapshot.data['upcomingEvent']
  }

  ngOnInit(): void {
    this.dataService.showNewEvent.next(true)
  }

  onDelete(id: string, name: string) {
    swal({
      title: 'Eliminar el evento',
      text: `Seguro quieres eliminar el evento ${name} ?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      confirmButtonText: 'SI',
      cancelButtonText: "NO",
       buttonsStyling: false
    }).then((result) => {
      if (result.value) {
        this.courseService.deleteEvent(this.route.snapshot.parent.params['id'], id)
        .subscribe(data => {
          this.upcomingEvent = data
          Notification.show("<b>Éxito</b>",`Hemos borrado el evento ${name}`,"bottom","right","success")
        }, err => {
          Notification.show("<b>Error</b>",err)
        })
      }
    })
  }

  showEvents(date: string) {
    return this.authService.hasRole(['SuperAdmin','Admin','Teacher','Counselor'])
      && moment().startOf('day').isSameOrBefore(moment(date).startOf('day'))
  }

}

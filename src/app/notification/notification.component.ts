import { DataService } from 'src/services/data.service';
import { Notification } from './../../util/notifications';
import { UserService } from './../../services/user/user.service';
import { USER } from './../../util/constants';
import { NotificationByCourse } from './../../models/notification/notificationByCourse.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

declare const $: any;

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.sass']
})
export class NotificationComponent implements OnInit,OnDestroy {
  notfications: NotificationByCourse[]
  id: string
  currentNotification: string

  constructor(private route: ActivatedRoute, private userService: UserService,
    private dataService: DataService)
  {
    this.notfications = this.route.snapshot.data['response']
    this.id = localStorage.getItem(USER)

    if(this.route.snapshot.paramMap.has('id'))
      this.id = this.route.snapshot.paramMap.get('id')

    this.dataService.breadcrumbs.next(['Observador'])
  }

  ngOnInit(): void {
  }

  openDischarges(id: string) {
    this.currentNotification = id
    $("#dischargeModal").modal('show')
  }

  onDischarge(value: any) {
    $("#dischargeModal").modal('hide')
    this.userService.addDischarges(this.id,this.currentNotification, value)
      .subscribe(data => {
        this.notfications = data
        Notification.show("<b>Éxito</b>","Hemos guardado los descargos","bottom","right","success")
      }, err => {
        Notification.show("<b>Error</b>",err)
      })
    this.currentNotification = null
  }

  ngOnDestroy(): void {
    $("#dischargeModal").modal("hide");
    $('.modal-backdrop').remove();
    $('body').removeClass('modal-open');
  }

}

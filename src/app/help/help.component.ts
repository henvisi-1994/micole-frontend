import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CaseService } from 'src/services/case/case.service';
import { DataService } from 'src/services/data.service';
import { Notification } from 'src/util/notifications';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.sass']
})
export class HelpComponent implements OnInit {
  message: string
  lifeInDanger: boolean
  answered: boolean

  constructor(private route: ActivatedRoute, private caseService: CaseService,
    private readonly router: Router, private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.breadcrumbs.next(['Mi Cole Me Cuida'])

    this.lifeInDanger = false
    this.answered = false
    this.message = this.route.snapshot.data['response'].data || 'Mensaje no configurado por la sede'
  }

  createCase(event) {
    this.caseService.create(false,JSON.stringify(event)).subscribe((data) => {
      Notification.show("<b>Éxito</b>", "Hemos notificado tu caso a orientación y pronto se contactarán contigo. Recuerda que Mi Cole Me Cuida", "bottom", "right", "success");
      this.router.navigate(['/','dashboard'])
    }, (err) => {
      Notification.show("<b>Error</b>",err)
    })
  }

  action(value: boolean) {
    this.answered = true
    this.lifeInDanger = value
    this.caseService.notify().subscribe((data) => {
      Notification.show("<b>Éxito</b>", "Hemos notificado tu caso a orientación y pronto se contactarán contigo. Recuerda que Mi Cole Me Cuida", "bottom", "right", "success");
      if(value) {//We create the case without any more information
        this.caseService.create(this.lifeInDanger, null).subscribe((data) => {}, (err) => {
          Notification.show("<b>Error</b>",err)
        })
      }
    }, (err) => {
      Notification.show("<b>Error</b>",err)
    })
  }

}

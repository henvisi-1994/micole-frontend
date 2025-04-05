import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/services/data.service';
import { SchoolYearClose } from './../../../models/school-year/schoolYearClose.model';
import { Component, OnInit } from '@angular/core';
import { SchoolYearService } from 'src/services/school-year/school-year.service';
import { Notification } from 'src/util/notifications';

@Component({
  selector: 'app-school-year-close',
  templateUrl: './school-year-close.component.html',
  styleUrls: ['./school-year-close.component.sass']
})
export class SchoolYearCloseComponent implements OnInit {
  schoolYearPeriod: SchoolYearClose
  constructor(private dataService: DataService, private route: ActivatedRoute,
    private schoolYearService: SchoolYearService) { }

  ngOnInit(): void {
    this.schoolYearPeriod = this.route.snapshot.data['school_year']
    this.dataService.breadcrumbs.next(['Colegios','Sedes',this.schoolYearPeriod.franchise
    ,'Años Escolares',this.schoolYearPeriod.year,'Información', 'Año', 'Resumen'])
  }

  sendReport() {
    this.schoolYearService.closeYear(this.route.snapshot.paramMap.get('school_year_id'))
      .subscribe(data => {
        Notification.show("<b>Éxito</b>",data,"right","success")
      }, err => {
        Notification.show("<b>Error</b>",err)
      })
  }

}

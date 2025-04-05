import { SchoolYearPeriodSummary } from './../../../models/school-year/schoolYearPeriodSummary.model';
import { ActivatedRoute } from '@angular/router';
import { DataService } from './../../../services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-school-year-period',
  templateUrl: './school-year-period.component.html',
  styleUrls: ['./school-year-period.component.sass']
})
export class SchoolYearPeriodComponent implements OnInit {
  schoolYearPeriod: SchoolYearPeriodSummary
  constructor(private dataService: DataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.schoolYearPeriod = this.route.snapshot.data['school_year_period']
    this.dataService.breadcrumbs.next(['Colegios','Sedes',this.schoolYearPeriod.franchise,'Años Escolares',this.schoolYearPeriod.year,'Información', 'Periodo', 'Resumen'])

  }

}

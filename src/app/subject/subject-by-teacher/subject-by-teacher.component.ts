import { month } from './../../../models/parametric/month.model';
import { SubjectBySchoolYear } from './../../../models/subject/subjectBySchoolYear.model';
import { DataService } from './../../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-subject-by-teacher',
  templateUrl: './subject-by-teacher.component.html',
  styleUrls: ['./subject-by-teacher.component.sass']
})
export class SubjectByTeacherComponent implements OnInit {
  subjects: SubjectBySchoolYear[]
  month = month
  constructor(private route: ActivatedRoute, private router: Router,
    private dataService: DataService) {
      this.dataService.breadcrumbs.next(['Mis materias'])
    }

  ngOnInit(): void {
    this.subjects = this.route.snapshot.data['response']
  }

  subjectInfo(id: string, course: string) {
    this.router.navigate(['/','dashboard','courses',course,'subjects',id])
  }

  getSchoolYear(schoolYear: SubjectBySchoolYear) {
    if(schoolYear.startYear === schoolYear.endYear)
      return `${schoolYear.startYear} ${month[schoolYear.startMonth]}-${month[schoolYear.endMonth]}`
    return `${schoolYear.startYear} ${month[schoolYear.startMonth]} ${schoolYear.endYear} ${month[schoolYear.endMonth]}`

  }

}

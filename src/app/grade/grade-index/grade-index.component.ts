import { GradeBySubjectTask } from './../../../models/grade/gradeBySubjectTask.model';
import { GradeBySubject } from './../../../models/grade/gradeBySubject.model';
import { DataService } from './../../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GradeBySubjectPeriod } from 'src/models/grade/gradeBySubjectPeriod.model';
import { CourseSubjectById } from 'src/models/course-subject/courseSubjectById.model';

@Component({
  selector: 'app-grade-index',
  templateUrl: './grade-index.component.html',
  styleUrls: ['./grade-index.component.sass']
})
export class GradeIndexComponent implements OnInit {
  grades: GradeBySubject
  tasks: GradeBySubjectTask[]
  periods: GradeBySubjectPeriod[]
  courseSubject: CourseSubjectById

  constructor(private dataService: DataService, private route: ActivatedRoute,
    private router: Router)
  {
    this.courseSubject = route.snapshot.parent.parent.data["courseSubject"];
    this.dataService.breadcrumbs.next(['Cursos',this.courseSubject.course,'Materias',this.courseSubject.subject,'Notas'])
    this.grades = this.route.snapshot.data['response']
    this.periods = this.grades.periods
    this.tasks = []
  }

  ngOnInit(): void {
  }

  changePeriod(id: string) {
    this.tasks = this.periods.filter(x => x.id === id)[0].tasks
  }

  showTask(id: string) {
    this.router.navigate(['/','dashboard','tasks',id])
  }

}

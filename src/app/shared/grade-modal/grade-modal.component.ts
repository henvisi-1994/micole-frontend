import { SubjectStats } from './../../../models/stats/subjectStats.model';
import { CourseStats } from './../../../models/stats/courseStats.model';
import { CourseService } from 'src/services/course/course.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grade-modal',
  templateUrl: './grade-modal.component.html',
  styleUrls: ['./grade-modal.component.sass']
})
export class GradeModalComponent implements OnInit {
  @Input() id: string
  course: CourseStats
  grades: SubjectStats[] = []
  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.courseService.grades(this.id)
      .subscribe(data => {
        this.course = data
      }, err => {
        console.log(err)
      })
  }

  changePeriod(id: string) {
    let perido = this.course.periods.filter(x => x.id === id)
    this.grades = perido[0].subjects
  }

}

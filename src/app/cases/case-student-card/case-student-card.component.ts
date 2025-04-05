import { Component, Input, OnInit } from '@angular/core';
import { CaseById } from 'src/models/cases/caseById.model';

@Component({
  selector: 'app-case-student-card',
  templateUrl: './case-student-card.component.html',
  styleUrls: ['./case-student-card.component.sass']
})
export class CaseStudentCardComponent implements OnInit {
  @Input() case: CaseById

  constructor() { }

  ngOnInit(): void {
  }

  transform(value) {
    return  value ?? 'No se ha contestado la pregunta'
  }

}

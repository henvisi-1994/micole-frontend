import { Component, Input, OnInit } from '@angular/core';
import { CaseById } from 'src/models/cases/caseById.model';

@Component({
  selector: 'app-case-observation-card',
  templateUrl: './case-observation-card.component.html',
  styleUrls: ['./case-observation-card.component.sass']
})
export class CaseObservationCardComponent implements OnInit {
  @Input() case: CaseById

  constructor() { }

  ngOnInit(): void {
  }

}

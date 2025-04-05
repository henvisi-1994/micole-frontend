import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CaseById } from 'src/models/cases/caseById.model';

@Component({
  selector: 'app-case-card',
  templateUrl: './case-card.component.html',
  styleUrls: ['./case-card.component.sass']
})
export class CaseCardComponent implements OnInit {
  @Input() case: CaseById
  @Output() show: EventEmitter<boolean> = new EventEmitter()
  @Output() comment: EventEmitter<boolean> = new EventEmitter()
  @Output() close: EventEmitter<boolean> = new EventEmitter()
  showF: boolean
  constructor() {
    this.showF = true
  }

  ngOnInit(): void {
  }

  showForm() {
    this.showF = false
    this.show.emit(true)
  }

  addComment() {
    this.comment.emit(true)
  }

  closeCase() {
    this.close.emit(true)
  }

}

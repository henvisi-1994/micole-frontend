import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { SchoolYearById } from "src/models/school-year/schoolYearById.model";

@Component({
  selector: "app-school-year-card",
  templateUrl: "./school-year-card.component.html",
  styleUrls: ["./school-year-card.component.sass"],
})
export class SchoolYearCardComponent implements OnInit {
  @Input() schoolYear: SchoolYearById;
  @Output() period: EventEmitter<boolean> = new EventEmitter();
  @Output() summary: EventEmitter<boolean> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  createPeriod() {
    this.period.next(true);
  }

  showSummary(value) {
    this.summary.next(value);
  }
}

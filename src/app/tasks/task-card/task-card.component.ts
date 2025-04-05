import { Role } from "./../../../models/parametric/role.model";
import { AuthService } from "src/services/auth/auth.service";
import { TaskById } from "./../../../models/task/taskById.model";
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import * as moment from "moment"; // add this 1 of 4

@Component({
  selector: "app-task-card",
  templateUrl: "./task-card.component.html",
  styleUrls: ["./task-card.component.sass"],
})
export class TaskCardComponent implements OnInit {
  @Input() task: TaskById;
  @Output() onModal: EventEmitter<boolean> = new EventEmitter();
  @Output() onModalExcel: EventEmitter<boolean> = new EventEmitter();

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  openModal(value: boolean) {
    this.onModal.emit(value);
  }

  openModalExcel() {
    this.onModalExcel.emit(true);
  }

  validDate(): boolean {
    let date = moment(this.task.taskDate);
    let current = moment(new Date(), "YYYY-MM-DD");

    return current.startOf("day").isSameOrBefore(date.startOf("day"), "date");
  }
}

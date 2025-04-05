import { TaskInfo } from "src/models/task/taskInfo.model";
import { SchoolService } from "./../../../services/school/school.service";
import { PeriodSchool } from "./../../../models/school/schoolById.model";
import { showSuccess, hasError } from "src/util/validators";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  OnChanges,
  Output,
  EventEmitter,
} from "@angular/core";
import * as moment from "moment";
import { OnDestroy } from '@angular/core';

declare const $: any;

@Component({
  selector: "app-task-modal",
  templateUrl: "./task-modal.component.html",
  styleUrls: ["./task-modal.component.sass"],
})
export class TaskModalComponent implements OnInit, OnChanges, OnDestroy {
  @Input() modalTitle: string;
  @Input() modalButton: string;
  @Input() showPeriods: boolean;
  @Input() schoolId: string;
  @Input() currentTask: TaskInfo;
  periods: PeriodSchool[];
  @Output() onTask: EventEmitter<any> = new EventEmitter();

  taskForm: FormGroup;
  minDate: Date;

  constructor(private schoolService: SchoolService) {
    this.minDate = moment().startOf("day").toDate();
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.initForm();
    if (this.showPeriods)
      this.schoolService.getPeriods(this.schoolId).subscribe(
        (data) => {
          this.periods = data;
          this.initForm();
        },
        (err) => {
          console.log(err);
        }
      );
  }

  onSubmit() {
    $("#taskModal").modal("hide");
    this.onTask.emit(this.taskForm.value);
  }

  showSuccess(name: string): boolean {
    return showSuccess(this.taskForm, name);
  }

  hasError(name: string, validation: string) {
    return hasError(this.taskForm, name, validation);
  }

  private initForm() {
    if(this.currentTask) {
      this.minDate = moment(this.currentTask.taskDate, 'yyyy/MM/dd').startOf("day").toDate();
    }
    this.taskForm = new FormGroup({
      name: new FormControl(this.currentTask?.name || "", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(255),
      ]),
      taskDate: new FormControl(
        this.currentTask
          ? moment(this.currentTask.taskDate).startOf("day").toDate()
          : "",
        [Validators.required]
      ),
      description: new FormControl(this.currentTask?.description || ""),
      percentage: new FormControl(this.currentTask?.percentage || 1, [
        Validators.required,
        Validators.min(1),
        Validators.max(100),
      ]),
    });
    if (this.showPeriods)
      this.taskForm.addControl(
        "periodId",
        new FormControl(this.periods ? this.periods[0].id : "", [
          Validators.required,
        ])
      );
  }

  ngOnDestroy(): void {
    $("#taskModal").modal("hide");
    $('.modal-backdrop').remove();
    $('body').removeClass('modal-open');

  }

}

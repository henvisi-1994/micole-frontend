import { FormControl, FormGroup, Validators } from "@angular/forms";
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";
import { PeriodSchool } from "src/models/school/schoolById.model";
import { hasError, showSuccess } from "src/util/validators";
import { SchoolService } from "src/services/school/school.service";
import { OnDestroy } from '@angular/core';

declare const $: any;

@Component({
  selector: "app-task-final-modal",
  templateUrl: "./task-final-modal.component.html",
  styleUrls: ["./task-final-modal.component.sass"],
})
export class TaskFinalModalComponent implements OnInit, OnChanges, OnDestroy {
  @Input() schoolId: string;
  periods: PeriodSchool[];
  @Output() onTask: EventEmitter<any> = new EventEmitter();

  taskForm: FormGroup;

  constructor(private schoolService: SchoolService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    this.initForm();
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
    $("#taskFinalModal").modal("hide");
    this.onTask.emit(this.taskForm.value);
  }

  showSuccess(name: string): boolean {
    return showSuccess(this.taskForm, name);
  }

  hasError(name: string, validation: string) {
    return hasError(this.taskForm, name, validation);
  }

  private initForm() {
    this.taskForm = new FormGroup({
      periodId: new FormControl(this.periods ? this.periods[0].id : "", [
        Validators.required,
      ]),
    });
  }

  ngOnDestroy(): void {
    $("#taskFinalModal").modal("hide");
    $('.modal-backdrop').remove();
    $('body').removeClass('modal-open');
  }

}

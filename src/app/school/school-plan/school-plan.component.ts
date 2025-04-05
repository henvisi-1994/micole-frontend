import { plan } from "./../../../models/parametric/plan.model";
import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";

declare const $: any;

@Component({
  selector: "app-school-plan",
  templateUrl: "./school-plan.component.html",
  styleUrls: ["./school-plan.component.sass"],
})
export class SchoolPlanComponent implements OnInit, OnDestroy {
  @Input() plan: string;
  @Output() onPlanSelected: EventEmitter<string> = new EventEmitter();
  planForm: FormGroup;
  planValue = plan;

  constructor() {}

  ngOnInit() {
    let mainPanel = document.getElementsByClassName("main-panel")[0];
    $(".modal").on("shown.bs.modal", function () {
      mainPanel.classList.add("no-scroll");
    });
    $(".modal").on("hidden.bs.modal", function () {
      mainPanel.classList.remove("no-scroll");
    });
    this.initForm();
  }

  onSubmit() {
    $("#planSchoolModal").modal("hide");
    this.onPlanSelected.emit(this.planForm.value.plan);
  }

  private initForm() {
    this.planForm = new FormGroup({
      plan: new FormControl(this.plan),
    });
  }

  getPlans(): string[] {
    return Object.keys(this.planValue);
  }

  ngOnDestroy(): void {
    $("#planSchoolModal").modal("hide");
    $('.modal-backdrop').remove();
    $('body').removeClass('modal-open');
  }

}

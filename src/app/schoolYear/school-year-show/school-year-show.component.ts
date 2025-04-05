import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Action } from "./../../../models/parametric/action.model";
import { SCHOOL_YEAR } from "./../../../util/constants";
import { ActivatedRoute, Router } from "@angular/router";
import { DataService } from "./../../../services/data.service";
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SchoolYearService } from "src/services/school-year/school-year.service";
import { PeriodSchool } from "src/models/school/schoolById.model";
import { SchoolYearById } from "src/models/school-year/schoolYearById.model";
import { SchoolYearPeriod } from "src/models/school-year/schoolYearPeriod.model";
import swal from "sweetalert2";
import { Notification } from "src/util/notifications";
import { hasError, showSuccess } from 'src/util/validators';

declare const $: any;

@Component({
  selector: "app-school-year-show",
  templateUrl: "./school-year-show.component.html",
  styleUrls: ["./school-year-show.component.sass"],
})
export class SchoolYearShowComponent implements OnInit, OnDestroy {
  periods: PeriodSchool[];
  schoolYear: SchoolYearById;
  schoolYearPeriods: SchoolYearPeriod[];
  schoolYearHeaders: string[];
  schoolYearKeys: string[];
  schoolYearAction: Action[];
  modalForm: FormGroup;
  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private schoolYearService: SchoolYearService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.periods = this.route.snapshot.data["periods"];
    this.schoolYearPeriods = this.route.snapshot.data["school_years"];
    this.schoolYear = JSON.parse(localStorage.getItem(SCHOOL_YEAR));
    this.dataService.breadcrumbs.next([
      "Colegios",
      "Sedes",
      this.schoolYear.franchiseName,
      "Años Escolares",
      "Información",
    ]);

    this.schoolYearHeaders = ["Periodo", "Porcentaje", "Estado"];
    this.schoolYearKeys = ["period", "percentage", "status"];
    this.schoolYearAction = [
      { type: "info", action: "show", icon: "fa fa-eye", tooltip: "Consultar" },
      {
        type: "warning",
        action: "open",
        icon: "fa fa-book",
        tooltip: "Abrir",
      },
      {
        type: "danger",
        action: "delete",
        icon: "fa fa-trash",
        tooltip: "Cerrar",
      },
    ];

    this.initForm();
  }

  showSuccess(name: string): boolean {
    return showSuccess(this.modalForm, name);
  }

  hasError(name: string, validation: string) {
    return hasError(this.modalForm, name, validation);
  }

  onSchoolYearAction(value: any) {
    const schoolYearPeriod = this.schoolYearPeriods[value.index];
    if (value.action === "show") {
      if (schoolYearPeriod.open) {
        Notification.show(
          "<b>Éxito</b>",
          "El periodo no se encuentra cerrado, por favor cierrelo para ver su resumen",
          "bottom",
          "right",
          "success"
        );
      } else {
        this.router.navigate(["periods", schoolYearPeriod.id], {
          relativeTo: this.route,
        });
      }
    } else if (value.action === 'open') {
      if(!schoolYearPeriod.open) {
        swal({
          title: "Abrir periodo año escolar",
          text: "Seguro quieres quieres abrir el periodo ?",
          type: "warning",
          showCancelButton: true,
          confirmButtonClass: "btn btn-success",
          cancelButtonClass: "btn btn-danger",
          confirmButtonText: "SI",
          cancelButtonText: "NO",
          buttonsStyling: false,
        }).then((result) => {
          if (result.value) {
            this.schoolYearService.open(schoolYearPeriod.id, this.schoolYear.id).subscribe(
              (data) => {
                this.schoolYearPeriods = data;
                Notification.show(
                  "<b>Éxito</b>",
                  "Hemos abierto el periodo exitosamente",
                  "bottom",
                  "right",
                  "success"
                );
              },
              (err) => {
                Notification.show("<b>Error</b>", err);
              }
            );
          }
        });
      } else {
        Notification.show(
          "<b>Éxito</b>",
          "El periodo ya se encuentra abierto",
          "bottom",
          "right",
          "success"
        );
      }
    } else {
      if (schoolYearPeriod.open) {
        swal({
          title: "Cerrar periodo año escolar",
          text: "Seguro quieres quieres cerrar el periodo ?",
          type: "warning",
          showCancelButton: true,
          confirmButtonClass: "btn btn-success",
          cancelButtonClass: "btn btn-danger",
          confirmButtonText: "SI",
          cancelButtonText: "NO",
          buttonsStyling: false,
        }).then((result) => {
          if (result.value) {
            this.schoolYearService.close(schoolYearPeriod.id,this.schoolYear.id).subscribe(
              (data) => {
                this.schoolYearPeriods = data;
                Notification.show(
                  "<b>Éxito</b>",
                  "Hemos cerrado el periodo exitosamente",
                  "bottom",
                  "right",
                  "success"
                );
              },
              (err) => {
                Notification.show("<b>Error</b>", err);
              }
            );
          }
        });
      } else {
        Notification.show(
          "<b>Éxito</b>",
          "El periodo ya se encuentra cerrado",
          "bottom",
          "right",
          "success"
        );
      }
    }
  }

  createPeriod() {
    $("#schoolYearPeriodModal").modal("show");
  }

  showSummary(value) {
    const all = this.schoolYearPeriods.every((x) => !x.open);
    if (all && value) {
      this.router.navigate(["years"], { relativeTo: this.route });
    } else if (all && !value) {
      this.schoolYearService.closeYearPoint(this.schoolYear.id).subscribe(
        (data) => {
          Notification.show("<b>Éxito</b>", data, "bottom", "right", "success");
          this.schoolYear.close = true;
          localStorage.setItem(SCHOOL_YEAR, JSON.stringify(this.schoolYear));
        },
        (err) => {
          Notification.show("<b>Error</b>", err);
        }
      );
    } else if (!all && !value) {
      Notification.show(
        "<b>Error</b>",
        "Todos los peridos tiene que estar cerrados para cerrar el año escolar"
      );
    } else {
      Notification.show(
        "<b>Error</b>",
        "Todos los peridos tiene que estar cerrados para ver el resumen del año escolar"
      );
    }
  }

  private initForm() {
    this.modalForm = new FormGroup({
      periodId: new FormControl(this.periods[0].id, [Validators.required]),
      percentage: new FormControl(1,[Validators.required, Validators.min(1),Validators.max(100)])
    });
  }

  submit() {
    $("#schoolYearPeriodModal").modal("hide");
    this.schoolYearService
      .create(this.schoolYear.id, this.modalForm.value)
      .subscribe(
        (data) => {
          this.schoolYearPeriods = data;
          Notification.show(
            "<b>Éxito</b>",
            "Hemos creado el periodo exitosamente",
            "bottom",
            "right",
            "success"
          );
        },
        (err) => {
          Notification.show("<b>Error</b>", err);
        }
      );
  }

  ngOnDestroy(): void {
    $("#schoolYearPeriodModal").modal("hide");
    $('.modal-backdrop').remove();
    $('body').removeClass('modal-open');
  }

}

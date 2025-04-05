import { SCHOOL, CONFIG_GRADE } from "./../../../util/constants";
import { ActivatedRoute, Router } from "@angular/router";
import { DataService } from "src/services/data.service";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ConfigGrade } from "src/models/config-grade/configGrade.model";
import {
  configGradeValidator,
  hasError,
  maxLimitLevelValidator,
  showSuccess,
} from "src/util/validators";
import { SchoolService } from "src/services/school/school.service";
import { Notification } from "src/util/notifications";

@Component({
  selector: "app-config-form",
  templateUrl: "./config-form.component.html",
  styleUrls: ["./config-form.component.sass"],
})
export class ConfigFormComponent implements OnInit {
  isEditing: boolean;
  configForm: FormGroup;
  config: ConfigGrade;
  title: string;
  id: string;
  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private schoolService: SchoolService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    this.title = "Crear";
    this.isEditing = this.route.snapshot.data["isEditing"];
    if (this.isEditing) {
      this.title = "Actualizar";
      this.config = JSON.parse(localStorage.getItem(CONFIG_GRADE));
    }
    this.dataService.breadcrumbs.next([
      "Colegios",
      "Equivalencia de notas",
      this.title,
    ]);
    this.initForm();
  }

  showSuccess(name: string, subGroup: string = null): boolean {
    let group: FormGroup;
    if (subGroup) {
      group = this.configForm.get(subGroup) as FormGroup;
    } else {
      group = this.configForm;
    }
    return showSuccess(group, name);
  }

  hasError(name: string, validation: string, subGroup: string = null) {
    let group: FormGroup;
    if (subGroup) {
      group = this.configForm.get(subGroup) as FormGroup;
    } else {
      group = this.configForm;
    }
    return hasError(group, name, validation);
  }

  onSubmit() {
    if (!this.isEditing) {
      this.schoolService.addConfig(this.id, this.configForm.value).subscribe(
        (data) => {
          Notification.show("<b>Éxito</b>", data, "bottom", "right", "success");
          this.router.navigate(["/", "dashboard", "schools", this.id]);
        },
        (err) => {
          Notification.show("<b>Error</b>", err);
        }
      );
    } else {
      this.schoolService
        .updateConfig(this.id, this.config.id, this.configForm.value)
        .subscribe(
          (data) => {
            Notification.show(
              "<b>Éxito</b>",
              data,
              "bottom",
              "right",
              "success"
            );
            this.router.navigate(["/", "dashboard", "schools", this.id]);
          },
          (err) => {
            Notification.show("<b>Error</b>", err);
          }
        );
    }
  }

  initForm() {
    this.configForm = new FormGroup(
      {
        name: new FormControl(this.config?.name || "", [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255),
        ]),
        initials: new FormControl(this.config?.initials || "", [
          Validators.required,
        ]),
        minValue: new FormControl(this.config?.minValue || 0, [
          Validators.required,
          Validators.min(0),
        ]),
        maxValue: new FormControl(this.config?.maxValue || 0, [
          Validators.required,
        ]),
      },
      [configGradeValidator]
    );
  }
}

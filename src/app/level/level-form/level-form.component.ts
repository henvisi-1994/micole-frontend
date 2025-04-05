import { Level } from "./../../../models/level/level.model";
import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { DataService } from "src/services/data.service";
import {
  hasError,
  maxLimitLevelValidator,
  showSuccess,
} from "src/util/validators";
import { LevelService } from "src/services/level/level.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Notification } from "src/util/notifications";
import { LEVEL } from "src/util/constants";

@Component({
  selector: "app-level-form",
  templateUrl: "./level-form.component.html",
  styleUrls: ["./level-form.component.sass"],
})
export class LevelFormComponent implements OnInit {
  title: string;
  levelForm: FormGroup;
  level: Level;
  fileToUpload: File;
  isEditing: boolean;
  constructor(
    private dataService: DataService,
    private levelService: LevelService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.title = "Crear";
    this.isEditing = this.route.snapshot.data["isEditing"];
    if (this.isEditing) {
      this.title = "Actualizar";
      this.level = JSON.parse(localStorage.getItem(LEVEL));
    }
    this.dataService.breadcrumbs.next(["Niveles", this.title]);
    this.initForm();
  }

  onSubmit() {
    const values = {
      ...this.levelForm.value,
      image: this.fileToUpload,
    };
    if (!this.isEditing) {
      this.levelService.addLevel(values).subscribe(
        (data) => {
          Notification.show("<b>Éxito</b>", data, "bottom", "right", "success");
          this.router.navigate(["/", "dashboard", "levels"]);
        },
        (err) => {
          Notification.show("<b>Error</b>", err);
        }
      );
    } else {
      this.levelService.updateLevel(this.level.id, values).subscribe(
        (data) => {
          Notification.show("<b>Éxito</b>", data, "bottom", "right", "success");
          this.router.navigate(["/", "dashboard", "levels"]);
        },
        (err) => {
          Notification.show("<b>Error</b>", err);
        }
      );
    }
  }

  showSuccess(name: string, subGroup: string = null): boolean {
    let group: FormGroup;
    if (subGroup) {
      group = this.levelForm.get(subGroup) as FormGroup;
    } else {
      group = this.levelForm;
    }
    return showSuccess(group, name);
  }

  hasError(name: string, validation: string, subGroup: string = null) {
    let group: FormGroup;
    if (subGroup) {
      group = this.levelForm.get(subGroup) as FormGroup;
    } else {
      group = this.levelForm;
    }
    return hasError(group, name, validation);
  }

  extensions() {
    return "image/jpeg,image/jpg,image/png";
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  initForm() {
    this.levelForm = new FormGroup(
      {
        name: new FormControl(this.level?.name || "", [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255),
        ]),
        description: new FormControl(this.level?.description || ""),
        lowerBound: new FormControl(this.level?.lowerBound || 0, [
          Validators.required,
          Validators.min(0),
        ]),
        upperBound: new FormControl(this.level?.upperBound || 0, [
          Validators.required,
        ]),
      },
      [maxLimitLevelValidator]
    );
    if (!this.isEditing) {
      this.levelForm.addControl(
        "image",
        new FormControl(null, [Validators.required])
      );
    } else {
      this.levelForm.addControl("image", new FormControl(null));
    }
  }
}

import { PrizeService } from "./../../../services/prize/prize.service";
import { Router, ActivatedRoute } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Prize } from "./../../../models/prize/prize.model";
import { Component, OnInit } from "@angular/core";
import { DataService } from "src/services/data.service";
import { PRIZE } from "src/util/constants";
import { hasError, showSuccess } from "src/util/validators";
import { Notification } from "src/util/notifications";

@Component({
  selector: "app-prize-form",
  templateUrl: "./prize-form.component.html",
  styleUrls: ["./prize-form.component.sass"],
})
export class PrizeFormComponent implements OnInit {
  title: string;
  prizeForm: FormGroup;
  prize: Prize;
  fileToUpload: File;
  isEditing: boolean;
  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute,
    private prizeService: PrizeService
  ) {}

  ngOnInit(): void {
    this.title = "Crear";
    this.isEditing = this.route.snapshot.data["isEditing"];
    if (this.isEditing) {
      this.title = "Actualizar";
      this.prize = JSON.parse(localStorage.getItem(PRIZE));
    }
    this.dataService.breadcrumbs.next(["Premios", this.title]);
    this.initForm();
  }

  onSubmit() {
    const values = this.prizeForm.value;
    if (!this.isEditing) {
      this.prizeService
        .addPrize(
          this.route.snapshot.params["id"],
          values["name"],
          values["description"],
          values["points"],
          this.fileToUpload
        )
        .subscribe(
          (data) => {
            Notification.show(
              "<b>Éxito</b>",
              data,
              "bottom",
              "right",
              "success"
            );
            this.router.navigate([
              "/",
              "dashboard",
              "allies",
              this.route.snapshot.params["id"],
            ]);
          },
          (err) => {
            Notification.show("<b>Error</b>", err);
          }
        );
    } else {
      this.prizeService
        .updatePrize(
          this.prize.id,
          values["name"],
          values["description"],
          values["points"],
          this.fileToUpload
        )
        .subscribe(
          (data) => {
            Notification.show(
              "<b>Éxito</b>",
              data,
              "bottom",
              "right",
              "success"
            );
            this.router.navigate(["/", "dashboard", "prizes", this.prize.id]);
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
      group = this.prizeForm.get(subGroup) as FormGroup;
    } else {
      group = this.prizeForm;
    }
    return showSuccess(group, name);
  }

  hasError(name: string, validation: string, subGroup: string = null) {
    let group: FormGroup;
    if (subGroup) {
      group = this.prizeForm.get(subGroup) as FormGroup;
    } else {
      group = this.prizeForm;
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
    this.prizeForm = new FormGroup({
      name: new FormControl(this.prize?.name || "", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(255),
      ]),
      description: new FormControl(this.prize?.description || ""),
      points: new FormControl(this.prize?.points || 0, [
        Validators.required,
        Validators.min(0),
      ]),
    });
    if (!this.isEditing) {
      this.prizeForm.addControl(
        "image",
        new FormControl(null, [Validators.required])
      );
    } else {
      this.prizeForm.addControl("image", new FormControl(null));
    }
  }
}

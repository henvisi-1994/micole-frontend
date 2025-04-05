import { AllyShow } from "src/models/ally/allyShow.model";
import { AllyService } from "src/services/ally/ally.service";
import { ActivatedRoute, Router } from "@angular/router";
import { DataService } from "src/services/data.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { ALLY } from "src/util/constants";
import { hasError, showSuccess } from "src/util/validators";
import { Notification } from "src/util/notifications";

@Component({
  selector: "app-ally-edit",
  templateUrl: "./ally-edit.component.html",
  styleUrls: ["./ally-edit.component.sass"],
})
export class AllyEditComponent implements OnInit {
  allyForm: FormGroup;
  fileToUpload: File = null;
  id: string;
  ally: AllyShow;
  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private allyService: AllyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.ally = JSON.parse(localStorage.getItem(ALLY));
    this.dataService.breadcrumbs.next(["Aliados", "Actualizar"]);
    this.initForm();
    this.id = this.route.snapshot.params["id"];
  }

  onSubmit() {
    const values = this.allyForm.value;
    this.allyService
      .updateAlly(
        this.id,
        values.name,
        values.description,
        values.contactDetail,
        this.fileToUpload
      )
      .subscribe(
        (data) => {
          Notification.show("<b>Éxito</b>", data, "bottom", "right", "success");
          this.router.navigate(["/", "dashboard", "allies", this.id]);
        },
        (err) => {
          Notification.show("<b>Error</b>", err);
        }
      );
  }

  showSuccess(name: string, subGroup: string = null): boolean {
    let group: FormGroup;
    if (subGroup) {
      group = this.allyForm.get(subGroup) as FormGroup;
    } else {
      group = this.allyForm;
    }
    return showSuccess(group, name);
  }

  hasError(name: string, validation: string, subGroup: string = null) {
    let group: FormGroup;
    if (subGroup) {
      group = this.allyForm.get(subGroup) as FormGroup;
    } else {
      group = this.allyForm;
    }
    return hasError(group, name, validation);
  }

  extensions() {
    return "image/jpeg,image/jpg,image/png";
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  private initForm() {
    this.allyForm = new FormGroup({
      name: new FormControl(this.ally.name, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(255),
      ]),
      contactDetail: new FormControl(this.ally.contactDetail, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(500),
      ]),
      description: new FormControl(this.ally.description),
      image: new FormControl(null),
    });
  }
}

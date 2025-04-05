import { FormControl, FormGroup, Validators } from "@angular/forms";
import { SchoolWithFranchises } from "src/models/school/schoolWithFranchises.model";
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
} from "@angular/router";
import { DataService } from "src/services/data.service";
import { Component, OnInit } from "@angular/core";
import { hasError, showSuccess } from "src/util/validators";
import { AllyService } from "src/services/ally/ally.service";
import { Notification } from "src/util/notifications";

@Component({
  selector: "app-ally-form",
  templateUrl: "./ally-form.component.html",
  styleUrls: ["./ally-form.component.sass"],
})
export class AllyFormComponent implements OnInit {
  schools: SchoolWithFranchises[];
  allyForm: FormGroup;
  fileToUpload: File;
  id: string;
  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private allyService: AllyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dataService.breadcrumbs.next(["Aliados", "Crear"]);
    this.schools = this.route.snapshot.data["response"];
    this.initForm();
    this.id = this.route.snapshot.params["id"];
  }

  onSubmit() {
    const values = this.allyForm.value;
    this.allyService
      .createAlly(
        this.id,
        values.name,
        values.description,
        values.contactDetail,
        values.franchises || [],
        this.fileToUpload
      )
      .subscribe(
        (data) => {
          Notification.show("<b>Éxito</b>", data, "bottom", "right", "success");
          this.router.navigate([
            "/",
            "dashboard",
            "categories",
            this.id,
            "allies",
          ]);
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
      name: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(255),
      ]),
      franchises: new FormControl(null),
      contactDetail: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(500),
      ]),
      description: new FormControl(""),
      image: new FormControl(null, [Validators.required]),
    });
  }
}

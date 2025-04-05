import { Notification } from "./../../../util/notifications";
import { SchoolService } from "./../../../services/school/school.service";
import { AuthService } from "src/services/auth/auth.service";
import { plan } from "./../../../models/parametric/plan.model";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { DataService } from "./../../../services/data.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { showSuccess, hasError, ValidatePhone } from "src/util/validators";
import { ValidateExt } from "../../../util/validators";
import swal from "sweetalert2";
import { SchoolById } from "src/models/school/schoolById.model";

@Component({
  selector: "app-school-form",
  templateUrl: "./school-form.component.html",
  styleUrls: ["./school-form.component.sass"],
})
export class SchoolFormComponent implements OnInit {
  isEditing: boolean;
  schoolForm: FormGroup;
  title: string;
  isVisible: boolean = false;
  planValue = plan;
  canUpdatePlan: boolean = false;
  school: SchoolById;
  defaultPhoto = "../../../../assets/img/logo.png";

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private schoolService: SchoolService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dataService.showSchoolNew.next(false);
    this.school = this.route.snapshot.data["school"];
    this.route.data.subscribe((value) => {
      this.isEditing = value["isEditing"];
      if (this.isEditing) {
        this.dataService.breadcrumbs.next(["Colegios", "Sedes", "Crear"]);
        this.dataService.breadcrumbs.next(["Colegios", "Editar"]);
        this.title = "Actualizar";
        this.initForm();
      } else {
        this.dataService.breadcrumbs.next(["Colegios", "Crear"]);
        this.title = "Crear";
        this.initForm();
      }
    });
  }

  onSubmit() {
    let request = this.schoolService.createSchool(this.schoolForm.value);
    if (this.isEditing) {
      request = this.schoolService.updateSchool(
        this.school.id,
        this.schoolForm.value
      );
    }
    request.subscribe(
      (data: string) => {
        swal({
          title: "Éxito",
          text: data,
          buttonsStyling: false,
          confirmButtonClass: "btn btn-success",
          type: "success",
        })
          .then((result) => {
            if (result.value) {
              this.router.navigate(["/", "dashboard", "schools"]);
            }
          })
          .catch(swal.noop);
      },
      (err: string) => {
        swal({
          title: "Error",
          text: err,
          buttonsStyling: false,
          confirmButtonClass: "btn btn-danger",
          type: "error",
        });
      }
    );
  }

  showSuccess(name: string, subGroup: string = null): boolean {
    let group: FormGroup;
    if (subGroup) {
      group = this.schoolForm.get(subGroup) as FormGroup;
    } else {
      group = this.schoolForm;
    }
    return showSuccess(group, name);
  }

  hasError(name: string, validation: string, subGroup: string = null) {
    let group: FormGroup;
    if (subGroup) {
      group = this.schoolForm.get(subGroup) as FormGroup;
    } else {
      group = this.schoolForm;
    }
    return hasError(group, name, validation);
  }

  private initForm() {
    this.schoolForm = new FormGroup({
      name: new FormControl(this.school?.name || "", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(255),
      ]),
      description: new FormControl(this.school?.description || ""),
      address: new FormGroup({
        country: new FormControl(this.school?.address?.country || "", [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255),
        ]),
        city: new FormControl(this.school?.address?.city || "", [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255),
        ]),
        street: new FormControl(this.school?.address?.street || "", [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255),
        ]),
        postCode: new FormControl(this.school?.address?.postCode || "", [
          Validators.required,
          Validators.pattern(/^[0-9]{3,30}$/),
        ]),
      }),
      dane: new FormControl(this.school?.dane || "", [
        Validators.required,
        Validators.minLength(3),
      ]),
      resolution: new FormControl(this.school?.resolution || "", [
        Validators.required,
        Validators.minLength(3),
      ]),
      shortName: new FormControl(this.school?.shortName || "", [
        Validators.required,
        Validators.minLength(3),
      ]),
      phone: new FormGroup({
        number: new FormControl(this.school?.phone?.number || "", [
          Validators.required,
          Validators.pattern(/^[0-9]{6,15}$/),
        ]),
        indicative: new FormControl(
          this.school?.phone?.indicative.substring(1) || "",
          [Validators.required, Validators.pattern(/^[0-9]{2,6}$/)]
        ),
        ext: new FormControl(this.school?.phone?.ext || "", [ValidateExt]),
      }),
      directorName: new FormControl(this.school?.directorName ?? '', [Validators.required]),
      directorIdentification: new FormControl(this.school?.directorIdentification ?? '', [Validators.required]),
      secretariatName: new FormControl(this.school?.secretariatName ?? '', [Validators.required]),
      secretariatIdentification: new FormControl(this.school?.secretariatIdentification ?? '', [Validators.required]),
      sms: new FormControl(this.school?.sms || false),
      email: new FormControl(this.school?.email || "", [
        Validators.required,
        Validators.email,
      ]),
    });
    // this.canUpdatePlan = this.authService.hasPermission(["CanCreateSchool"]);
    // if (this.canUpdatePlan) {
    //   this.schoolForm.addControl(
    //     "plan",
    //     new FormControl(this.school?.plan || this.getPlans()[0])
    //   );
    // }
    this.isVisible = true;
  }

  getPlans(): string[] {
    return Object.keys(this.planValue);
  }

  onLogo(file: File) {
    this.schoolService.updateLogo(this.school.id, file).subscribe(
      (data) => {
        window.location.reload();
      },
      (err) => {
        Notification.show("<b>Error</b>", err);
      }
    );
  }
}

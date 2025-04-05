import { CATEGORY } from "./../../../util/constants";
import { Category } from "./../../../models/category/category.model";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { DataService } from "src/services/data.service";
import { CategoryService } from "src/services/category/category.service";
import { Router, ActivatedRoute } from "@angular/router";
import { hasError, showSuccess } from "src/util/validators";
import { Notification } from "src/util/notifications";

@Component({
  selector: "app-category-form",
  templateUrl: "./category-form.component.html",
  styleUrls: ["./category-form.component.sass"],
})
export class CategoryFormComponent implements OnInit {
  title: string;
  categoryGroup: FormGroup;
  isEditing: boolean;
  category?: Category;
  constructor(
    private dataService: DataService,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.title = "Crear";
    this.isEditing = this.route.snapshot.data["isEditing"];
    if (this.isEditing) {
      this.title = "Actualizar";
      this.category = JSON.parse(localStorage.getItem(CATEGORY));
    }
    this.dataService.breadcrumbs.next(["Categorias", this.title]);
    this.initForm();
  }

  onSubmit() {
    if (!this.isEditing) {
      this.categoryService.addCategory(this.categoryGroup.value).subscribe(
        (data) => {
          Notification.show("<b>Éxito</b>", data, "bottom", "right", "success");
          this.router.navigate(["/", "dashboard", "categories"]);
        },
        (err) => {
          Notification.show("<b>Error</b>", err);
        }
      );
    } else {
      this.categoryService
        .updateCategory(this.category.id, this.categoryGroup.value)
        .subscribe(
          (data) => {
            Notification.show(
              "<b>Éxito</b>",
              data,
              "bottom",
              "right",
              "success"
            );
            this.router.navigate(["/", "dashboard", "categories"]);
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
      group = this.categoryGroup.get(subGroup) as FormGroup;
    } else {
      group = this.categoryGroup;
    }
    return showSuccess(group, name);
  }

  hasError(name: string, validation: string, subGroup: string = null) {
    let group: FormGroup;
    if (subGroup) {
      group = this.categoryGroup.get(subGroup) as FormGroup;
    } else {
      group = this.categoryGroup;
    }
    return hasError(group, name, validation);
  }

  private initForm() {
    this.categoryGroup = new FormGroup({
      name: new FormControl(this.category?.name || "", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(255),
      ]),
      description: new FormControl(this.category?.description || ""),
    });
  }
}

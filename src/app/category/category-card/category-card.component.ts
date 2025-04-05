import { CategoryService } from "./../../../services/category/category.service";
import { Router } from "@angular/router";
import { Category } from "./../../../models/category/category.model";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Notification } from "src/util/notifications";
import swal from "sweetalert2";
import { CATEGORY } from "src/util/constants";
declare const $: any;

@Component({
  selector: "app-category-card",
  templateUrl: "./category-card.component.html",
  styleUrls: ["./category-card.component.sass"],
})
export class CategoryCardComponent implements OnInit {
  @Input() category: Category;
  @Output() onLoadCategories = new EventEmitter<Category[]>();
  constructor(
    private router: Router,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {}

  updateCategory() {
    localStorage.setItem(CATEGORY, JSON.stringify(this.category));
    this.router.navigate([
      "/",
      "dashboard",
      "categories",
      this.category.id,
      "edit",
    ]);
  }

  moveToAllies() {
    localStorage.setItem(CATEGORY, JSON.stringify(this.category));
    this.router.navigate([
      "/",
      "dashboard",
      "categories",
      this.category.id,
      "allies",
    ]);
  }

  deleteCategory() {
    swal({
      title: `Eliminar nivel: ${this.category.name}`,
      text: "Seguro quieres borrar la categoria ?",
      type: "warning",
      showCancelButton: true,
      confirmButtonClass: "btn btn-success",
      cancelButtonClass: "btn btn-danger",
      confirmButtonText: "SI",
      cancelButtonText: "NO",
      buttonsStyling: false,
    }).then((result) => {
      if (result.value) {
        this.categoryService.deleteCategory(this.category.id).subscribe(
          (data) => {
            this.onLoadCategories.emit(data);
            Notification.show(
              "<b>Éxito</b>",
              "Hemos borrado la categoria",
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
  }
}

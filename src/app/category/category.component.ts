import { CATEGORY } from "./../../util/constants";
import { Category } from "./../../models/category/category.model";
import { ActivatedRoute, Router } from "@angular/router";
import { DataService } from "src/services/data.service";
import { Component, OnInit } from "@angular/core";
import { CategoryService } from "src/services/category/category.service";

@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.sass"],
})
export class CategoryComponent implements OnInit {
  categories: Category[];

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dataService.breadcrumbs.next(["Categorias"]);
    this.categories = this.route.snapshot.data["response"];
  }

  onLoadCategories(categories) {
    this.categories = categories;
  }
}

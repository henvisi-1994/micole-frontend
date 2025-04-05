import { Pagination } from "./../../models/parametric/pagination.model";
import { CATEGORY } from "./../../util/constants";
import { Category } from "./../../models/category/category.model";
import { CategoryService } from "src/services/category/category.service";
import { Component, OnInit } from "@angular/core";
import { DataService } from "src/services/data.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Ally } from "src/models/ally/ally.model";
import { Action } from "src/models/parametric/action.model";

@Component({
  selector: "app-ally",
  templateUrl: "./ally.component.html",
  styleUrls: ["./ally.component.sass"],
})
export class AllyComponent implements OnInit {
  category: Category;
  id: string;
  items: any[] = [];
  keys: string[];
  actions: Action[];
  pagination: Pagination = null;
  show: boolean = false;
  headers: string[] = [];

  constructor(
    private dataService: DataService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  moveToCreateAlly() {
    this.router.navigate([
      "/",
      "dashboard",
      "categories",
      this.id,
      "allies",
      "new",
    ]);
  }

  ngOnInit(): void {
    this.category = JSON.parse(localStorage.getItem(CATEGORY));
    this.dataService.breadcrumbs.next([
      "Categorias",
      this.category.name,
      "Aliados",
    ]);
    this.headers = ["Nombre", "Descripción", "Detalles de contacto"];
    this.keys = ["name", "description", "contactDetail"];
    this.actions = [
      { type: "info", action: "show", icon: "fa fa-eye", tooltip: "Consultar" },
    ];
    this.id = this.route.snapshot.params["id"];

    this.show = true;
    this.items = this.route.snapshot.data["response"].data;
    this.pagination = this.route.snapshot.data["response"].pagination;
  }

  onRequest(value: any) {
    // this.currentSearch = value.text
    let request = this.categoryService.getAlliesByCategory(
      this.id,
      value.text,
      value.page,
      this.pagination.itemPerPage
    );
    request.subscribe((response) => {
      this.items = response.data;
      this.pagination = response.pagination;
    });
  }

  onAction(value: any) {
    const ally = this.items[value.index];
    if (value.action === "show") {
      this.router.navigate(["/", "dashboard", "allies", ally.id]);
    }
  }
}

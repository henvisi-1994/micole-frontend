import { Category } from "./../../../models/category/category.model";
import { SCHOOL } from "./../../../util/constants";
import { Pagination } from "src/models/parametric/pagination.model";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { AllyService } from "src/services/ally/ally.service";
import { Ally } from "src/models/ally/ally.model";
import { DataService } from "src/services/data.service";
import { CategoryService } from "src/services/category/category.service";

@Component({
  selector: "app-ally-index",
  templateUrl: "./ally-index.component.html",
  styleUrls: ["./ally-index.component.sass"],
})
export class AllyIndexComponent implements OnInit {
  allies: Ally[];
  school: string;
  pagination: Pagination;
  categories: Category[];
  categoryId: string = null;
  search = "";
  constructor(
    private allyService: AllyService,
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    private categoryService: CategoryService
  ) {}

  changeFilter(value) {
    this.categoryId = value;
  }

  ngOnInit(): void {
    this.school = localStorage.getItem(SCHOOL);
    this.dataService.breadcrumbs.next(["Aliados"]);
    this.allies = this.route.snapshot.data["response"].data;
    this.pagination = this.route.snapshot.data["response"].pagination;
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
      this.categories.unshift({
        id: null,
        name: "Todos",
        description: "",
      });
    });
  }

  onRequest(data) {
    this.loadData(data.page);
  }

  searchAlly() {
    this.loadData(1);
  }

  private loadData(page: number) {
    this.allyService
      .getSchoolAllies(
        localStorage.getItem(SCHOOL),
        this.search,
        page,
        this.pagination.itemPerPage,
        this.categoryId
      )
      .subscribe((response) => {
        this.allies = response.data;
        this.pagination = response.pagination;
      });
  }
}

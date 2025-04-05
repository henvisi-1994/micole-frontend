import { Action } from "./../../../models/parametric/action.model";
import { SchoolService } from "./../../../services/school/school.service";
import { UserService } from "./../../../services/user/user.service";
import { Pagination } from "./../../../models/parametric/pagination.model";
import { DataService } from "src/services/data.service";
import { Component, OnInit, EventEmitter } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-school-index",
  templateUrl: "./school-index.component.html",
  styleUrls: ["./school-index.component.sass"],
})
export class SchoolIndexComponent implements OnInit {
  headers: string[];
  items: any[] = [];
  keys: string[];
  actions: Action[];
  pagination: Pagination = null;
  show: boolean = false;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private schoolService: SchoolService,
    private router: Router
  ) {
    this.headers = [
      "Nombre",
      "Codigo dane",
      "Nombre corto",
      "Direccion",
      "Teléfono",
      "Correo electrónico",
      "Estado",
    ];
    this.keys = [
      "name",
      "dane",
      "shortName",
      "address",
      "phone",
      "email",
      "status",
    ];
    this.actions = [
      {
        type: "primary",
        action: "edit",
        icon: "fa fa-edit",
        tooltip: "Editar",
      },
      { type: "info", action: "show", icon: "fa fa-eye", tooltip: "Consultar" },
    ];
  }

  ngOnInit(): void {
    this.dataService.breadcrumbs.next(["Colegios"]);
    this.dataService.showSchoolNew.next(true);
    let response = this.route.snapshot.data["response"];
    this.items = response.data;
    this.pagination = response.pagination;
    this.show = true;
  }

  onRequest(value: any) {
    this.schoolService
      .getSchools(value.page, this.pagination.itemPerPage, value.text)
      .subscribe((response) => {
        this.items = response.data;
        this.pagination = response.pagination;
      });
  }

  onAction(value: any) {
    if (value.action === "edit") {
      this.router.navigate([
        "/",
        "dashboard",
        "schools",
        this.items[value.index].id,
        value.action,
      ]);
    } else {
      this.router.navigate([
        "/",
        "dashboard",
        "schools",
        this.items[value.index].id,
      ]);
    }
  }
}

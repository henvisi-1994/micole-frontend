import { UserPoint } from "./../../../models/user/userPoint.model";
import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { Action } from "src/models/parametric/action.model";
import { Pagination } from "src/models/parametric/pagination.model";
import { DataService } from "src/services/data.service";
import { PointService } from "src/services/point/point.service";
import { UserService } from "src/services/user/user.service";
import { USER } from "src/util/constants";

@Component({
  selector: "app-point-index",
  templateUrl: "./point-index.component.html",
  styleUrls: ["./point-index.component.sass"],
})
export class PointIndexComponent implements OnInit {
  items: any[] = [];
  keys: string[];
  actions: Action[];
  pagination: Pagination = null;
  show: boolean = false;
  headers: string[] = [];
  userPoint: UserPoint;
  constructor(
    private dataService: DataService,
    private pointService: PointService,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.dataService.breadcrumbs.next(["Mis puntos"]);
    this.headers = ["Puntos", "Descripción", "Fecha"];
    this.keys = ["points", "description", "createdAt"];
    this.actions = [
      // { type: "info", action: "show", icon: "fa fa-eye", tooltip: "Consultar" },
    ];
    this.show = true;
    this.items = this.route.snapshot.data["response"].data;
    this.pagination = this.route.snapshot.data["response"].pagination;
    this.userService.points(localStorage.getItem(USER)).subscribe((data) => {
      this.userPoint = data;
    });
  }

  onRequest(value: any) {
    // this.currentSearch = value.text
    let request = this.pointService.getPoints(
      value.page,
      this.pagination.itemPerPage
    );
    request.subscribe((response) => {
      this.items = response.data;
      this.pagination = response.pagination;
    });
  }

  onAction(value: any) {}
}

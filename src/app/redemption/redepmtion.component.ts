import { DataService } from "src/services/data.service";
import { Prize } from "src/models/prize/prize.model";
import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { PrizeService } from "src/services/prize/prize.service";
import { Action } from "src/models/parametric/action.model";
import { Pagination } from "src/models/parametric/pagination.model";

@Component({
  selector: "app-redepmtion",
  templateUrl: "./redepmtion.component.html",
  styleUrls: ["./redepmtion.component.sass"],
})
export class RedepmtionComponent implements OnInit {
  prize: Prize;
  items: any[] = [];
  keys: string[];
  actions: Action[];
  pagination: Pagination = null;
  show: boolean = false;
  headers: string[] = [];

  constructor(
    private prizeService: PrizeService,
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.prize = this.route.snapshot.data["response"];
    this.dataService.breadcrumbs.next([
      "Premios",
      this.prize.name,
      "Cupones",
    ]);
    this.headers = ["Nombre", "Codigo", "Fecha"];
    this.keys = ["user", "code", "redemptionDate"];
    this.actions = [];
    this.prizeService.getAllRedemptions(this.prize.id).subscribe((response) => {
      this.show = true;
      this.items = response.data;
      this.pagination = response.pagination;
    });
  }

  onRequest(value: any) {
    let request = this.prizeService.getAllRedemptions(
      this.prize.id,
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

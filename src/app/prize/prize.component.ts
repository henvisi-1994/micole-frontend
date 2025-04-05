import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { PrizeService } from "src/services/prize/prize.service";
import { DataService } from "src/services/data.service";
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Prize } from "src/models/prize/prize.model";
import { Notification } from "src/util/notifications";
import { Action } from "src/models/parametric/action.model";
import { Pagination } from "src/models/parametric/pagination.model";

declare const $: any;

@Component({
  selector: "app-prize",
  templateUrl: "./prize.component.html",
  styleUrls: ["./prize.component.sass"],
})
export class PrizeComponent implements OnInit, OnDestroy {
  prize: Prize;
  id: string;
  items: any[] = [];
  keys: string[];
  actions: Action[];
  pagination: Pagination = null;
  show: boolean = false;
  headers: string[] = [];
  constructor(
    private dataService: DataService,
    private prizeService: PrizeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.prize = this.route.snapshot.data["response"];
    this.dataService.breadcrumbs.next(["Premios", this.prize.name]);
    this.id = this.route.snapshot.params["id"];
    this.reloadCoupouns();
    this.headers = ["Codigo", "Usado"];
    this.keys = ["code", "usedText"];
    this.actions = [];
  }

  reloadData() {
    this.prizeService.getById(this.id).subscribe((data) => {
      this.prize = data;
    });
    this.reloadCoupouns();
  }

  reloadCoupouns() {
    this.prizeService.getAllCoupons(this.id).subscribe((response) => {
      this.show = true;
      this.items = response.data;
      this.pagination = response.pagination;
    });
  }

  uploadCoupon() {
    $("#couponModal").modal("show");
  }

  changeStatus() {
    let value = "DISABLE";
    if (this.prize.disabled) {
      value = "ENABLE";
    }
    this.prizeService.changeStatus(this.prize.id, value).subscribe(
      (data) => {
        this.prize = data;
        Notification.show(
          "<b>Éxito</b>",
          "Hemos cambiado el estado del premio",
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

  onRequest(value: any) {
    let request = this.prizeService.getAllCoupons(
      this.id,
      value.page,
      this.pagination.itemPerPage
    );
    request.subscribe((response) => {
      this.items = response.data;
      this.pagination = response.pagination;
    });
  }

  onAction(value: any) {}

  ngOnDestroy(): void {
    $("#couponModal").modal("hide");
    $('.modal-backdrop').remove();
    $('body').removeClass('modal-open');
  }
}

import { Pagination } from "./../../../models/parametric/pagination.model";
import { ActivatedRoute, Router } from "@angular/router";
import { AllyShow } from "./../../../models/ally/allyShow.model";
import { Component, OnInit } from "@angular/core";
import { DataService } from "src/services/data.service";
import { AllyService } from "src/services/ally/ally.service";
import { Notification } from "src/util/notifications";
import { Action } from "src/models/parametric/action.model";

@Component({
  selector: "app-ally-show",
  templateUrl: "./ally-show.component.html",
  styleUrls: ["./ally-show.component.sass"],
})
export class AllyShowComponent implements OnInit {
  ally: AllyShow;
  items: any[] = [];
  keys: string[];
  actions: Action[];
  pagination: Pagination = null;
  show: boolean = false;
  headers: string[] = [];
  id: string;
  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private allyService: AllyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.ally = this.route.snapshot.data["response"];
    this.items = this.route.snapshot.data["data"].data;
    this.pagination = this.route.snapshot.data["data"].pagination;
    this.dataService.breadcrumbs.next(["Aliados", this.ally.name]);
    this.headers = ["Nombre", "Descripción", "Puntos"];
    this.keys = ["name", "description", "points"];
    this.actions = [
      { type: "info", action: "show", icon: "fa fa-eye", tooltip: "Consultar" },
    ];
    this.show = true;
    this.id = this.route.snapshot.params["id"];
  }

  moveToCreatePrize() {
    this.router.navigate([
      "/",
      "dashboard",
      "allies",
      this.ally.id,
      "prizes",
      "new",
    ]);
  }

  changeStatus() {
    let value = "DISABLE";
    if (this.ally.disabled) {
      value = "ENABLE";
    }
    this.allyService.changeStatus(this.ally.id, value).subscribe(
      (data) => {
        this.ally = data;
        Notification.show(
          "<b>Éxito</b>",
          "Hemos cambiado el estado del aliado",
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
    // this.currentSearch = value.text
    let request = this.allyService.getAllPricesByAlly(
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
    const prize = this.items[value.index];
    if (value.action === "show") {
      this.router.navigate(["/", "dashboard", "prizes", prize.id]);
    }
  }
}

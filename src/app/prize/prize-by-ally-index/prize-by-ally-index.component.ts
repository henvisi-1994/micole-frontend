import { PrizeService } from "src/services/prize/prize.service";
import { UserPoint } from "src/models/user/userPoint.model";
import { Pagination } from "src/models/parametric/pagination.model";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AllyService } from "src/services/ally/ally.service";
import { DataService } from "src/services/data.service";
import { Prize } from "src/models/prize/prize.model";
import { UserService } from "src/services/user/user.service";
import { USER } from "src/util/constants";
import { Notification } from "src/util/notifications";

@Component({
  selector: "app-prize-by-ally-index",
  templateUrl: "./prize-by-ally-index.component.html",
  styleUrls: ["./prize-by-ally-index.component.sass"],
})
export class PrizeByAllyIndexComponent implements OnInit {
  prizes: Prize[];
  pagination: Pagination;
  userPoints: UserPoint;
  show: boolean = false;
  constructor(
    private allyService: AllyService,
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    private userService: UserService,
    private prizeService: PrizeService
  ) {}

  ngOnInit(): void {
    this.prizes = this.route.snapshot.data["response"].data;
    this.dataService.breadcrumbs.next(["Aliados", "Premios"]);
    this.pagination = this.route.snapshot.data["response"].pagination;
    this.loadPoints();
  }

  onRequest(data) {
    this.loadData(data.page);
  }

  searchPrizes(value: string) {
    this.loadData(1, value);
  }

  redemPrize(id: string) {
    this.prizeService
      .redemPrize(id, this.route.snapshot.params["id"])
      .subscribe(
        (data) => {
          this.show = true;
          this.loadPoints();
          this.prizes = data.data;
          this.pagination = data.pagination;
          // Notification.show("<b>Éxito</b>", data, "bottom", "right", "success");
        },
        (err) => {
          Notification.show("<b>Error</b>", err);
        }
      );
  }

  private loadPoints() {
    this.userService
      .points(localStorage.getItem(USER))
      .subscribe((response) => {
        if (this.show) {
          this.show = false;
          Notification.show(
            "<b>Éxito</b>",
            "Hemos redimido el premio",
            "bottom",
            "right",
            "success"
          );
        }
        this.userPoints = response;
      });
  }

  private loadData(page: number, search = "") {
    this.allyService
      .getAllPricesByAlly(
        this.route.snapshot.params["id"],
        search,
        page,
        this.pagination.itemPerPage
      )
      .subscribe((response) => {
        this.prizes = response.data;
        this.pagination = response.pagination;
      });
  }
}

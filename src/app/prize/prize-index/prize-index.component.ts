import { UserPoint } from "./../../../models/user/userPoint.model";
import { UserService } from "./../../../services/user/user.service";
import { SCHOOL, USER } from "./../../../util/constants";
import { ActivatedRoute } from "@angular/router";
import { PrizeService } from "src/services/prize/prize.service";
import { Component, OnInit } from "@angular/core";
import { DataService } from "src/services/data.service";
import { Prize } from "src/models/prize/prize.model";
import { Pagination } from "src/models/parametric/pagination.model";
import { Notification } from "src/util/notifications";

@Component({
  selector: "app-prize-index",
  templateUrl: "./prize-index.component.html",
  styleUrls: ["./prize-index.component.sass"],
})
export class PrizeIndexComponent implements OnInit {
  prizes: Prize[];
  pagination: Pagination;
  userPoints: UserPoint;
  show: boolean = false;
  constructor(
    private dataService: DataService,
    private prizeService: PrizeService,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.dataService.breadcrumbs.next(["Premios"]);
    this.prizes = this.route.snapshot.data["response"].data;
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
    this.prizeService.redemPrize(id).subscribe(
      (data) => {
        this.prizes = data.data;
        this.pagination = data.pagination;
        this.show = true;
        this.loadPoints();
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
    this.prizeService
      .getPrices(
        localStorage.getItem(SCHOOL),
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

import { USER } from "./../../../util/constants";
import { UserRedemption } from "./../../../models/redemption/userRedemption.model";
import { UserService } from "./../../../services/user/user.service";
import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { DataService } from "src/services/data.service";
import { Pagination } from "src/models/parametric/pagination.model";

@Component({
  selector: "app-redemption-index",
  templateUrl: "./redemption-index.component.html",
  styleUrls: ["./redemption-index.component.sass"],
})
export class RedemptionIndexComponent implements OnInit {
  redemptions: UserRedemption[];
  pagination: Pagination;
  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.dataService.breadcrumbs.next(["Mis cupones"]);
    this.redemptions = this.route.snapshot.data["response"].data;
    this.pagination = this.route.snapshot.data["response"].pagination;
  }

  onRequest(data) {
    this.loadData(data.page);
  }

  private loadData(page: number, search = "") {
    this.userService
      .redemptions(
        localStorage.getItem(USER),
        page,
        this.pagination.itemPerPage
      )
      .subscribe((response) => {
        this.redemptions = response.data;
        this.pagination = response.pagination;
      });
  }
}

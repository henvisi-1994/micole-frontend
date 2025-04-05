import { UserPoint } from "./../../../models/user/userPoint.model";
import { Router } from "@angular/router";
import { PRIZE } from "./../../../util/constants";
import { Prize } from "./../../../models/prize/prize.model";
import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-prize-card",
  templateUrl: "./prize-card.component.html",
  styleUrls: ["./prize-card.component.sass"],
})
export class PrizeCardComponent implements OnInit {
  @Input() prize: Prize;
  @Input() userPoint: UserPoint;
  @Input() show: boolean = true;
  @Output() onChangeStatus = new EventEmitter<boolean>();
  @Output() onUploadCoupon = new EventEmitter<boolean>();
  @Output() onRedemPrize = new EventEmitter<string>();
  constructor(private router: Router) {}

  ngOnInit(): void {}

  changeStatusPrize() {
    this.onChangeStatus.emit(true);
  }

  uploadCoupon() {
    this.onUploadCoupon.emit(true);
  }

  goToRedemption() {
    this.router.navigate([
      "/",
      "dashboard",
      "prizes",
      this.prize.id,
      "redemptions",
    ]);
  }

  redemPrize() {
    this.onRedemPrize.emit(this.prize.id);
  }

  updatePrize() {
    localStorage.setItem(PRIZE, JSON.stringify(this.prize));
    this.router.navigate(["/", "dashboard", "prizes", this.prize.id, "edit"]);
  }
}

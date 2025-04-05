import { UserRedemption } from "./../../../models/redemption/userRedemption.model";
import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-redemption-card",
  templateUrl: "./redemption-card.component.html",
  styleUrls: ["./redemption-card.component.sass"],
})
export class RedemptionCardComponent implements OnInit {
  @Input() redemption: UserRedemption;
  constructor() {}

  ngOnInit(): void {}
}

import { UserPoint } from "./../../../models/user/userPoint.model";
import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-user-point",
  templateUrl: "./user-point.component.html",
  styleUrls: ["./user-point.component.sass"],
})
export class UserPointComponent implements OnInit {
  @Input() point: UserPoint;
  constructor() {}

  ngOnInit(): void {}
}

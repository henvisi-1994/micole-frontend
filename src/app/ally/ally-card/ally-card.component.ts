import { Router } from "@angular/router";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { AllyShow } from "src/models/ally/allyShow.model";
import { ALLY } from "src/util/constants";

@Component({
  selector: "app-ally-card",
  templateUrl: "./ally-card.component.html",
  styleUrls: ["./ally-card.component.sass"],
})
export class AllyCardComponent implements OnInit {
  @Input() ally: AllyShow;
  @Input() show: boolean;
  @Input() school: string = null;
  @Output() onChangeStatus = new EventEmitter<boolean>();

  constructor(private router: Router) {}

  ngOnInit(): void {}

  changeStatusLevel() {
    this.onChangeStatus.emit(true);
  }

  filteredFranchises() {
    // console.log(this.school);
    if (this.school) {
      return this.ally.franchises.filter((x) => x.schoolId === this.school);
    }
    return this.ally.franchises;
  }

  moveToPrizes() {
    this.router.navigate([
      "/",
      "dashboard",
      "school-allies",
      this.ally.id,
      "prizes",
    ]);
  }

  updateLevel() {
    localStorage.setItem(ALLY, JSON.stringify(this.ally));
    this.router.navigate(["/", "dashboard", "allies", this.ally.id, "edit"]);
  }
}

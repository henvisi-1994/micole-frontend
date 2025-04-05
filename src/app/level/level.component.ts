import { Level } from "./../../models/level/level.model";
import { Component, OnInit } from "@angular/core";
import { DataService } from "src/services/data.service";
import { ActivatedRoute, Router } from "@angular/router";
import { LevelService } from "src/services/level/level.service";

declare const $: any;

@Component({
  selector: "app-level",
  templateUrl: "./level.component.html",
  styleUrls: ["./level.component.sass"],
})
export class LevelComponent implements OnInit {
  levels: Level[];

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private levelService: LevelService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dataService.breadcrumbs.next(["Niveles"]);
    this.levels = this.route.snapshot.data["response"];
  }

  onLoadLevels(levels) {
    this.levels = levels;
  }
}

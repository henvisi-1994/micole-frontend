import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { DataService } from "./../services/data.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.sass"],
})
export class AppComponent implements OnInit {
  showLoadingScreen: boolean;

  constructor(
    private dataService: DataService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.dataService.loadingScreen.subscribe((value) => {
      this.showLoadingScreen = value;
      this.cdr.detectChanges();
    });
  }
}

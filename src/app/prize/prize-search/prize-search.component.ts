import { Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-prize-search",
  templateUrl: "./prize-search.component.html",
  styleUrls: ["./prize-search.component.sass"],
})
export class PrizeSearchComponent implements OnInit {
  search = "";
  @Output() onSearch = new EventEmitter<string>();
  constructor() {}

  ngOnInit(): void {}

  searchPrizes() {
    this.onSearch.emit(this.search);
  }
}

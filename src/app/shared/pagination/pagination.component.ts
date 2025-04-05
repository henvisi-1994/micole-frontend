import { Pagination } from "./../../../models/parametric/pagination.model";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-pagination",
  templateUrl: "./pagination.component.html",
  styleUrls: ["./pagination.component.sass"],
})
export class PaginationComponent implements OnInit {
  @Input() pagination: Pagination;
  @Output() onRequest: EventEmitter<{ page: number }> = new EventEmitter();
  quantity = 4;
  constructor() {}

  ngOnInit(): void {}

  leftPagination(): boolean {
    if (this.pagination) return this.pagination.currentPage - 1 === 0;
  }

  rightPagination(): boolean {
    if (this.pagination)
      return this.pagination.currentPage === this.pagination.totalPages;
  }

  selectedPagination(num: number) {
    if (num == -1) {
      this.onRequest.emit({ page: this.pagination.currentPage - 1 });
    } else if (num == -2) {
      this.onRequest.emit({ page: this.pagination.currentPage + 1 });
    } else if (this.pagination.currentPage != num) {
      this.onRequest.emit({ page: num });
    }
  }

  hasActive(num: number): boolean {
    return num === this.pagination.currentPage;
  }

  generatePaginationLinks(): number[] {
    let values = [this.pagination.currentPage];
    let middle = this.quantity / 2;

    let left = 0;
    let right = 0;

    if (this.pagination.currentPage + middle > this.pagination.totalPages) {
      left = this.pagination.currentPage + middle - this.pagination.totalPages;
    }

    if (this.pagination.currentPage - middle <= 0) {
      right = middle - this.pagination.currentPage + 1;
    }

    for (let index = 1; index <= middle + left; index++) {
      if (this.pagination.currentPage - index > 0) {
        values.unshift(this.pagination.currentPage - index);
      }
    }
    for (let index = 1; index <= middle + right; index++) {
      if (this.pagination.currentPage + index <= this.pagination.totalPages) {
        values.push(this.pagination.currentPage + index);
      }
    }
    return values;
  }
}

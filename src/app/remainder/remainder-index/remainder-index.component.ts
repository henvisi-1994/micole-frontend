import { Observable } from 'rxjs';
import { Pagination } from './../../../models/parametric/pagination.model';
import { RemainderService } from './../../../services/remainder/remainder.service';
import { RemainderInfo } from './../../../models/remainder/remainderInfo.model';
import { Response } from './../../../models/reponse.model';
import { ActivatedRoute } from '@angular/router';
import { DataService } from './../../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { Remainder } from 'src/models/remainder/remainder.model';

@Component({
  selector: 'app-remainder-index',
  templateUrl: './remainder-index.component.html',
  styleUrls: ['./remainder-index.component.sass']
})
export class RemainderIndexComponent implements OnInit {
  response: Response<Remainder>
  remainder: Remainder
  pagination: Pagination

  constructor(private dataService: DataService, private route: ActivatedRoute,
    private remainderService: RemainderService) {
    this.dataService.breadcrumbs.next(['Notificaciones'])
    this.response = this.route.snapshot.data['remainder']
    this.remainder = this.response.data
    this.pagination = this.response.pagination
  }

  ngOnInit(): void {
  }

  readRemainder(r: RemainderInfo) {
    this.remainderService.readRemainder(r.id)
    .subscribe(value => {
      this.remainder.count -= 1
      r.read = true
    })

  }

  remainderType(type: string): string {
    switch (type) {
      case "TASK":
        return "TAREA"
      case "NOTIFICATION":
        return "OBSERVADOR"
      case "REMAINDER":
        return "NOTIFICACIÓN"
      case "ATTENDANCE":
        return "ASISTENCIA"
      case "EVENT":
        return "EVENTO"
      default:
        return "CALIFICACIÓN"
    }
  }

  leftPagination(): boolean {
    if(this.pagination)
      return this.pagination.currentPage - 1 === 0
  }

  rightPagination(): boolean {
    if(this.pagination)
      return this.pagination.currentPage === this.pagination.totalPages
  }

  selectedPagination(num: number) {
    if(this.pagination.currentPage == num) {
      return
    }
    let request: Observable<Response<Remainder>>
    if(num == -1) {
      request = this.remainderService.getRemainders(this.pagination.currentPage - 1, 10)
    } else if(num == -2) {
      request = this.remainderService.getRemainders(this.pagination.currentPage + 1, 10)
    } else if(this.pagination.currentPage != num){
      request = this.remainderService.getRemainders(num, 10)
    }
    request.subscribe(response => {
      this.pagination = response.pagination
      this.remainder = response.data
    })
  }

  hasActive(num: number):boolean {
    return num === this.pagination.currentPage
  }

  generatePaginationLinks(): number[] {
    let values = [this.pagination.currentPage]
    let middle = 5 / 2

    let left = 0
    let right = 0

    if((this.pagination.currentPage + middle) > this.pagination.totalPages) {
      left  = (this.pagination.currentPage + middle) - this.pagination.totalPages
    }

    if((this.pagination.currentPage - middle) <= 0) {
      right  =  middle - this.pagination.currentPage + 1
    }

    for (let index = 1; index <= middle + left; index++) {
      if(this.pagination.currentPage - index > 0) {
        values.unshift(this.pagination.currentPage - index)
      }
    }
    for (let index = 1; index <= middle + right; index++) {
      if(this.pagination.currentPage + index <= this.pagination.totalPages) {
        values.push(this.pagination.currentPage + index)
      }
    }
    return values
  }

}

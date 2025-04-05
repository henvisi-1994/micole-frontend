import { FormGroup, FormControl } from '@angular/forms';
import { Pagination } from './../../../models/parametric/pagination.model';
import { Action } from './../../../models/parametric/action.model';
import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass']
})
export class TableComponent implements OnInit, OnDestroy {
  @Input() photo: boolean = false
  @Input() title: string
  @Input() subtitle: string
  @Input() headers: string[]
  @Input() hasActions: boolean = false
  @Input() items: any[] = []
  @Input() itemKeys: string[] = []
  @Input() actions: Action[] = []
  @Input() hasPagination: boolean = false
  @Input() pagination: Pagination
  @Input() quantity: number = 4
  @Input() showSearch: boolean = false
  @Input() collapsibleKey: string = ""
  @Input() collapsibleHeaders: string[] = []
  @Output() onRequest: EventEmitter<{page: number, text: string}> = new EventEmitter()
  @Output() onAction: EventEmitter<{action: string, index: number}> = new EventEmitter();
  collapsibleItems: any[] = []

  searchForm: FormGroup

  private subscription: Subscription;


  constructor() { }

  ngOnInit(): void {
    if(this.showSearch)
      this.initForm()
  }

  onClick(action: string, index: number) {
    this.onAction.emit({action, index})
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
    // if(this.showSearch && this.pagination.currentPage != num) {
    //   this.searchForm.setValue( {
    //     text: ''
    //   })
    // }
    if(num === -1) {
      this.onRequest.emit({page: this.pagination.currentPage - 1, text: this.searchForm.value.text || ''})
    } else if(num === -2) {
      this.onRequest.emit({page: this.pagination.currentPage + 1, text: this.searchForm.value.text || ''})
    } else if(this.pagination.currentPage != num){
      this.onRequest.emit({page: num, text: this.searchForm.value.text || ''})
    }
  }

  hasActive(num: number):boolean {
    return num === this.pagination.currentPage
  }

  generatePaginationLinks(): number[] {
    let values = [this.pagination.currentPage]
    let middle = this.quantity / 2

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

  private initForm() {
    this.searchForm = new FormGroup({
      text: new FormControl('')
    })

    this.subscription = this.searchForm.get('text').valueChanges
    .pipe(debounceTime(500),
      distinctUntilChanged())
      .subscribe(v => {
          this.onRequest.emit({page: 1, text: v})
      })
  }

  ngOnDestroy() {
    if(this.subscription)
      this.subscription.unsubscribe();
  }


  getCollapsibleItems(index: number) {
    return this.items[index][this.collapsibleKey]
  }

  getCollapsibleKeys(object: any) {
    return Object.keys(object)
  }

}

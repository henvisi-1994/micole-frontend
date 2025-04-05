import { map, debounceTime, distinctUntilChanged, mergeMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from './../../../models/user/user.model';
import { UserService } from './../../../services/user/user.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { isObject } from 'util';

declare const $: any;

@Component({
  selector: 'app-select-person',
  templateUrl: './select-person.component.html',
  styleUrls: ['./select-person.component.sass']
})
export class SelectPersonComponent implements OnInit, OnDestroy {
  @Input() btnClass: string
  @Input() buttonText: string
  @Input() role: string
  @Input() index:number
  @Input() school: string
  selectedUser: User
  userForm: FormGroup
  users: Observable<User[]>
  @Output() onSelectedUser: EventEmitter<string> = new EventEmitter()
  @Output() onSelectedUserData: EventEmitter<User> = new EventEmitter()

  constructor(private userService: UserService) {

  }

  ngOnInit(): void {
    this.initForm()
    //this.users = this.searchQuery('')
    this.autocompleteSearch()
  }

  openModal() {
    this.selectedUser = null
    this.userForm.setValue({
      search: ''
    })
    $('#userModal' + this.index).modal('show')
  }

  private autocompleteSearch() {
    this.users = this.userForm.get('search').valueChanges
    .pipe(debounceTime(500),
      distinctUntilChanged(),
      mergeMap(value => {
        return this.searchQuery(value)
      }))
  }

  private searchQuery(search: string = '') {
    if(typeof search === 'object') {
      search = ''
    }
    return this.userService.getUsers(1,7,search,this.role,this.school)
      .pipe(map(response => {
        return response.data
      }))
  }

  private initForm() {
    this.userForm = new FormGroup({
      search: new FormControl('')
    })
  }

  displayFn(user: User): string {
    return user && user.fullName ? user.fullName : '';
  }

  selectedValue(event: MatAutocompleteSelectedEvent, user: User) {
    this.selectedUser = user
  }

  getUserImage(user: User) {
    return user.photo ? user.photo : '../../../assets/img/default-avatar.png'
  }

  clearSelection() {
    this.selectedUser = null
    this.userForm.setValue({
      search: ''
    })
  }

  selectUser() {
    $('#userModal' + this.index).modal('hide')
    this.onSelectedUser.emit(this.selectedUser.id)
    this.onSelectedUserData.emit(this.selectedUser)
    this.selectedUser = null
    this.userForm.setValue({
      search: ''
    })
  }

  ngOnDestroy(): void {
    $('#userModal' + this.index).modal("hide");
    $('.modal-backdrop').remove();
    $('body').removeClass('modal-open');
  }

}

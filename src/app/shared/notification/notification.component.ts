import { severity } from './../../../models/parametric/serverity.model';
import { showSuccess, hasError } from 'src/util/validators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-notification-modal',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.sass']
})
export class NotificationComponent implements OnInit, AfterViewInit {
  notificationForm: FormGroup
  severity = severity
  minDate: Date
  hasAppointment: boolean = false
  @Output() onNotification: EventEmitter<any> = new EventEmitter()
  constructor(private cdr: ChangeDetectorRef) {
    this.minDate = moment().startOf('day').toDate()
  }

  ngOnInit(): void {
    this.initForm()
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  private initForm() {
    this.notificationForm = new FormGroup({
      description: new FormControl('', [Validators.required, Validators.minLength(3)]),
      action: new FormControl('', [Validators.required, Validators.minLength(3)]),
      severity: new FormControl(this.getSeverities()[0],[Validators.required]),
      appointment: new FormControl(),
      hour: new FormControl()
    })
  }

  changeAppointment(value: boolean) {
    this.hasAppointment = value
    if(value) {
      this.notificationForm.get('appointment').setValidators([Validators.required])
      this.notificationForm.get('hour').setValidators([Validators.required])
    }else {
      this.notificationForm.get('appointment').clearValidators()
      this.notificationForm.get('appointment').setValue(null)
      this.notificationForm.get('hour').clearValidators()
      this.notificationForm.get('hour').setValue(null)
    }
  }

  showSuccess(name: string): boolean {
    return showSuccess(this.notificationForm, name)
  }

  hasError(name: string, validation: string) {
    return hasError(this.notificationForm, name, validation)
  }

  getSeverities() {
    return Object.keys(this.severity)
  }

  onSubmit() {
    this.onNotification.emit(this.notificationForm.value)
    this.notificationForm.reset()
    this.notificationForm.setValue({
      description: '',
      severity: this.getSeverities()[0],
      appointment: null,
      action: ''
    })
  }

}

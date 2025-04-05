import { showSuccess, hasError } from 'src/util/validators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-notification-discharge',
  templateUrl: './notification-discharge.component.html',
  styleUrls: ['./notification-discharge.component.sass']
})
export class NotificationDischargeComponent implements OnInit {
  dischargeForm: FormGroup
  @Output() onDischarge: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
    this.initForm()
  }

  showSuccess(name: string): boolean {
    return showSuccess(this.dischargeForm, name)
  }

  hasError(name: string, validation: string) {
    return hasError(this.dischargeForm, name, validation)
  }

  private initForm() {
    this.dischargeForm = new FormGroup({
      description: new FormControl('',[Validators.required, Validators.minLength(3)])
    })
  }

  onSubmit() {
    this.onDischarge.emit(this.dischargeForm.value)
    this.dischargeForm.reset()
    this.dischargeForm.setValue({
      description: ''
    })
  }

}

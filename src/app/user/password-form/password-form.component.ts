import { PasswordConfirmMatcher } from './../../../util/validators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ValidateConfirmPassword, showSuccess, hasError } from 'src/util/validators';

@Component({
  selector: 'app-password-form',
  templateUrl: './password-form.component.html',
  styleUrls: ['./password-form.component.sass']
})
export class PasswordFormComponent implements OnInit {
  @Input() title: string
  @Output() onPasswordChange: EventEmitter<any> = new EventEmitter<any>()
  passwordForm: FormGroup
  hide: boolean = true
  hideOld: boolean = true
  hideConfirm: boolean = true
  matcher = new PasswordConfirmMatcher()

  constructor() { }

  ngOnInit(): void {
    this.initForm()
  }

  onSubmit() {
    this.onPasswordChange.emit(this.passwordForm.value)
    this.passwordForm.reset()
    this.passwordForm.clearValidators()

  }

  showSuccess(name: string): boolean {
    return showSuccess(this.passwordForm, name)
  }

  hasError(name: string, validation: string) {
    return hasError(this.passwordForm, name, validation)
  }

  private initForm() {
    this.passwordForm = new FormGroup({
      oldPassword: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      newPassword: new FormControl(null, [Validators.required, Validators.minLength(8),Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]),
      newPasswordConfirmation: new FormControl(null, [Validators.required])
    }, [ValidateConfirmPassword] )
  }

}

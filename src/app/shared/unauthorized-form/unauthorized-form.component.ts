import { PasswordConfirmMatcher } from "./../../../util/validators";
import {
  showSuccess,
  hasError,
  ValidateConfirmPassword,
} from "src/util/validators";
import { Authentication } from "./../../../models/auth/authentication.model";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { SchoolParametric } from "src/models/parametric/school.model";

@Component({
  selector: "app-unauthorized-form",
  templateUrl: "./unauthorized-form.component.html",
  styleUrls: ["./unauthorized-form.component.sass"],
})
export class UnauthorizedFormComponent implements OnInit {
  @Input() schools: Array<SchoolParametric>;
  @Input() isLogin = true;
  @Input() isPasswordRestart = false;
  @Input() title: string;
  @Input() buttonText: string;
  @Output() onSubmit: EventEmitter<any> = new EventEmitter();
  cardHidden: boolean;
  hide = true;
  hideConfirm = true;
  matcher = new PasswordConfirmMatcher();

  loginForm: FormGroup;

  constructor() {
    this.cardHidden = true;
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.cardHidden = false;
    }, 1500);
    this.initForm();
  }

  showSuccess(name: string): boolean {
    return showSuccess(this.loginForm, name);
  }

  hasError(name: string, validation: string) {
    return hasError(this.loginForm, name, validation);
  }

  private initForm() {
    this.loginForm = new FormGroup({
      email: new FormControl("", [
        Validators.required,
        Validators.pattern(/(.+@.+\..+|.{3,10})/),
      ]),
    });
    if (this.isLogin) {
      this.loginForm.addControl(
        "password",
        new FormControl("", [Validators.required, Validators.minLength(8)])
      );
      this.loginForm.addControl(
        "accept",
        new FormControl(false, [Validators.requiredTrue])
      );
      // this.loginForm.addControl("schoolId", new FormControl(null));
    }

    if (this.isPasswordRestart) {
      this.loginForm = new FormGroup(
        {
          newPassword: new FormControl("", [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(
              /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
            ),
          ]),
          newPasswordConfirmation: new FormControl("", [Validators.required]),
        },
        [ValidateConfirmPassword]
      );
    }
  }

  onFormSubmit() {
    this.onSubmit.emit(this.loginForm.value);
  }
}

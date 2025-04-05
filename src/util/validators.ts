import {
  AbstractControl,
  FormGroup,
  FormControl,
  FormGroupDirective,
  NgForm,
} from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";

export const url = "(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?";

export function ValidatePhone(control: AbstractControl) {
  if (control.value != null && (<string>control.value).length > 0) {
    if (!/^[0-9]{7,7}$/.test(control.value)) {
      return { phone: true };
    } else {
      return null;
    }
  } else {
    return null;
  }
}

export function ValidateExt(control: AbstractControl) {
  if (control.value != null && (<string>control.value).length > 0) {
    if (!/^[0-9]{2,10}$/.test(control.value)) {
      return { ext: true };
    } else {
      return null;
    }
  } else {
    return null;
  }
}

export function ValdateUrl(control: AbstractControl) {
  if (control.value != null && (<string>control.value).length > 0) {
    if (
      !/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(
        control.value
      )
    ) {
      return { url: true };
    } else {
      return null;
    }
  } else {
    return null;
  }
}

export class PasswordConfirmMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const hasError = form.hasError("confirmation");
    return !!hasError;
  }
}

export function ValidateConfirmPassword(control: AbstractControl) {
  if (
    control.get("newPassword").value !==
    control.get("newPasswordConfirmation").value
  ) {
    return { confirmation: true };
  } else {
    return null;
  }
}

export function maxLimitLevelValidator(control: AbstractControl) {
  if (control.get("lowerBound").value >= control.get("upperBound").value) {
    return { level: true };
  }
  return null;
}

export function configGradeValidator(control: AbstractControl) {
  if (control.get("minValue").value >= control.get("maxValue").value) {
    return { config: true };
  }
  return null;
}

export function showSuccess(group: FormGroup, name: string): boolean {
  return (
    group.get(name).valid && (group.get(name).dirty || group.get(name).touched)
  );
}

export function hasError(
  group: FormGroup,
  name: string,
  validation: string
): boolean {
  return (
    group.get(name).invalid &&
    (group.get(name).dirty || group.get(name).touched) &&
    group.get(name).hasError(validation)
  );
}

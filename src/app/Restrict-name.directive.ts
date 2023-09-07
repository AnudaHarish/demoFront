import { AbstractControl, ValidatorFn } from "@angular/forms";

export function FirstnameValidator(): ValidatorFn {

  return (control: AbstractControl): { [key: string]: boolean } | null => {
    if (control.value.trim() == "sam") {
      return { 'NameNotAllowed': true };
    }
    return null;
  };



}
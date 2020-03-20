import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {

  constructor() { }

  public static email(control: AbstractControl): ValidationErrors | null {
    // From https://emailregex.com/
    const regex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return (control.value === '' || regex.test(control.value) ? null : { email: true });
  }

  public static noWhitespace(control: AbstractControl): ValidationErrors | null {
    const regex: RegExp = /\s/;
    return (regex.test(control.value) ? { nowhitespace: true } : null);
  }

  public static matchOtherField(matchTo: string): (control: AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!!control.parent && !!control.parent.value && control.value === control.parent.controls[matchTo].value) {
        return null;
      } else {
        return { matches: true };
      }
    };
  }
}
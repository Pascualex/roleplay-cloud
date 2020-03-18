import { AbstractControl } from '@angular/forms';

export class CustomValidators {

    constructor() { }

    public static noWhitespace(control: AbstractControl): {[key: string]: any} | null {
        const isWhitespace = (control.value || '').trim().lenght === 0;
        return !isWhitespace ? null : { 'whitespace': true };
    }
}
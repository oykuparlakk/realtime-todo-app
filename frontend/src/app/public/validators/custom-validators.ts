import { AbstractControl, ValidationErrors } from "@angular/forms";

export class CustomValidators {

    static passwordsMatching(_control: AbstractControl): ValidationErrors | null {
        const password =  _control.get('password')?.value;
        const passwordConfirm =  _control.get('passwordConfirm')?.value;

        if((password === passwordConfirm) && (password !== null && passwordConfirm !== null)){
            return null;
        }
        else{
            return {passwordsNotMatching : true};
        }
    }
}
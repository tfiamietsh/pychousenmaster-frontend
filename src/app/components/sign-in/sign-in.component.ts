import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.sass'
})
export class SignInComponent {
    authenticationForm!: FormGroup;
    error: string = '';
    isPasswordHidden: boolean = true;
    
    constructor(private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.authenticationForm = this.formBuilder.group({
            username: [''],
            password: ['']
        });
    }

    get username() {
        return this.authenticationForm.get('username');
    }

    get password() {
        return this.authenticationForm.get('password');
    }

    get passwordType() {
        return this.isPasswordHidden ? 'password' : 'text';
    }

    get passwordIcon() {
        return this.isPasswordHidden ? 'visibility_off' : 'visibility';
    }

    changePasswordState() {
        this.isPasswordHidden = !this.isPasswordHidden;
    }

    submit() {
        //  TODO
    }
}

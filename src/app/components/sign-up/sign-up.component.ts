import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from '../../services/registration.service';
import { first } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.sass'
})
export class SignUpComponent {
    registrationForm!: FormGroup;
    error: string = '';
    
    constructor(private formBuilder: FormBuilder, private regService: RegistrationService,
        private route: ActivatedRoute, private router: Router) { }

    ngOnInit() {
        this.registrationForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    get username() {
        return this.registrationForm.get('username');
    }

    get password() {
        return this.registrationForm.get('password');
    }

    check(element) {
        element.disabled = !this.username.value || !this.password.value;
    }

    submit() {
        this.regService.register(this.username.value, this.password.value)
            .pipe(first()).subscribe({
                next: () => {
                    this.router.navigateByUrl('/sign-in');
                },
                error: (error) => {
                    this.error = String(error).replace('Error: ', '');
                    this.username.setValue('');
                }
            });
    }
}

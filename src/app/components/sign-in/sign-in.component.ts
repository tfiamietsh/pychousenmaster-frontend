import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LoadingService } from 'src/app/services/loading.service';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.sass'
})
export class SignInComponent {
    authenticationForm!: FormGroup;
    error: string = '';
    isPasswordHidden: boolean = true;
    
    constructor(private formBuilder: FormBuilder, private authService: AuthenticationService,
        private route: ActivatedRoute, private router: Router, private loadingService: LoadingService,
        private navbarService: NavbarService) { }

    ngOnInit() {
        this.authenticationForm = this.formBuilder.group({
            username: [''],
            password: ['']
        });
        this.navbarService.setNavbarVisibility(false);
    }

    ngAfterViewInit() {
        this.loadingService.setState(false);
    }

    ngOnDestroy() {
        this.loadingService.setState(true);
        this.navbarService.setNavbarVisibility(true);
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
        this.authService.login(this.username.value, this.password.value)
            .pipe(first()).subscribe({
                next: () => {
                    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                    this.router.navigate([returnUrl]);
                },
                error: (error) => {
                    this.error = String(error).replace('Error: ', '');
                    this.password.setValue('');
                }
            });
    }
}

import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.sass'
})
export class NavbarComponent {
    constructor(private authService: AuthenticationService) { }

    get guest() {
        return !this.authService.user;
    }

    logout() {
        this.authService.logout();
    }
}

import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { NavbarService } from '../../services/navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.sass'
})
export class NavbarComponent {
    constructor(private authService: AuthenticationService, private navbarService: NavbarService) { }

    get navbar() {
        return this.navbarService.getNavbarVisibility();
    }

    get searchBar() {
        return this.navbarService.getSearchBarVisibility();
    }

    get class() {
        return this.searchBar ? '' : 'l-margin';
    }

    get guest() {
        return !this.authService.user;
    }

    setColor(iconElem: HTMLElement | any, spanElem: HTMLElement, colorize: boolean) {
        iconElem.color = colorize ? 'primary' : '';
        spanElem.setAttribute('style', `color: ${colorize ? '#E040FB' : ''}`);
    }

    goToProfile() {
        window.location.href = `${window.location.origin}/profile/${this.authService.user.username}`;
    }

    goToChallenges() {
        window.location.href = `${window.location.origin}/challenges/${this.authService.user.username}`;
    }

    logout() {
        this.authService.logout();
    }
}

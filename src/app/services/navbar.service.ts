import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NavbarService {
    private isNavbarVisible: boolean = true;
    private isSearchBarVisible: boolean = true;

    setNavbarVisibility(isVisible: boolean) {
        this.isNavbarVisible = isVisible;
    }

    getNavbarVisibility() {
        return this.isNavbarVisible;
    }

    setSearchBarVisibility(isVisible: boolean) {
        this.isSearchBarVisible = isVisible;
    }

    getSearchBarVisibility() {
        return this.isSearchBarVisible;
    }
}

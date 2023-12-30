import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { AuthenticationService } from '../services/authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationGuard {
    constructor(private router: Router, private authService: AuthenticationService) { }

    onlyUserCanActivate(snapshot: RouterStateSnapshot) {
        const user = this.authService.user;
        if (user && snapshot.root.data['roles'].includes(user.role))
            return true;
        this.router.navigate(['/sign-in']);
        return false;
    }

    onlyGuestCanActivate(_: RouterStateSnapshot) {
        const user = this.authService.user;
        if (!user)
            return true;
        this.router.navigate(['/']);
        return false;
    }
}

export const userOnly: CanActivateFn = (_: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    return inject(AuthenticationGuard).onlyUserCanActivate(state);
};

export const guestOnly: CanActivateFn = (_: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    return inject(AuthenticationGuard).onlyGuestCanActivate(state);
};

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, map } from "rxjs";
import { User } from "../helpers/user";
import { CookieService } from "ngx-cookie-service";
import { Router } from "@angular/router";
import { environment } from "../environment/environment";

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private userSubject: BehaviorSubject<User | null>
    private refreshTokenTimeout: any;
    
    constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) {
        this.userSubject = new BehaviorSubject<User | null>(this.getUser());
    }

    private checkUser(): boolean {
        return this.cookieService.check('user');
    }

    private getUser(): User | null {
        if (this.checkUser())
            return JSON.parse(this.cookieService.get('user'));
        return null;
    }

    get user(): User | null {
        return this.userSubject.value;
    }

    private startRefreshTokenTimer() {
        const expires = new Date(Date.now());

        expires.setMinutes(expires.getMinutes() + 10);
        this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(),
            expires.getTime() - Date.now());
    }

    private stopRefreshTokenTimer() {
        clearTimeout(this.refreshTokenTimeout);
    }

    private refreshUser(user: User | null) {
        this.userSubject.next(user);
        if (user) {
            this.cookieService.set('user', JSON.stringify(user));
            this.startRefreshTokenTimer();
        } else {
            this.cookieService.delete('user');
            this.stopRefreshTokenTimer();
        }
    }

    refreshToken() {
        return this.http.post<any>(`${environment.apiUrl}/token/refresh`,
            { 'username': this.user?.username || '' },
            { withCredentials: true })
            .pipe(map((response) => {
                let user: any = this.user;
                
                user.access_token = response['access_token'];
                this.refreshUser(user);
                return user;
            }));
    }

    login(username: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}/login`,
            { 'username': username, 'password': password },
            { withCredentials: true })
            .pipe(map((user) => {
                if (user['message']) {
                    this.userSubject.next(null);
                    throw new Error(user['message']);
                } else {
                    this.refreshUser(user);
                    return user;
                }
            }));
    }

    logout() {
        this.http.post<any>(`${environment.apiUrl}/logout/access`, {},
            { withCredentials: true }).subscribe();
        this.http.post<any>(`${environment.apiUrl}/logout/refresh`, {},
            { withCredentials: true }).subscribe();
        this.refreshUser(null);
        this.router.navigate(['/']);
    }
}

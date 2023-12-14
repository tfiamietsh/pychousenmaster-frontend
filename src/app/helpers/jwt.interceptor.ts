import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthenticationService } from '../services/authentication.service';
import { Observable } from "rxjs";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authService: AuthenticationService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const user = this.authService.user;
        let token: string = '';

        if (user)
            token = req.url.includes('refresh') ? user.refresh_token : user.access_token;
        return next.handle(token ? req.clone({
            setHeaders: { Authorization: 'Bearer ' + token }
        }) : req);
    }
}

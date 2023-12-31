import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthenticationService } from '../services/authentication.service';
import { Observable, catchError, throwError } from "rxjs";
import { Router } from "@angular/router";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authService: AuthenticationService, private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(catchError(error => {
            if ([401, 403].includes(error.status) && this.authService.user)
                this.authService.logout();
            else if (error.status == 404)
                this.router.navigate(['/not-found']);
            return throwError(() => error.error.message || error.statusText);
        }
        ));
    }
}

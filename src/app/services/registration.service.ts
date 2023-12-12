import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';

@Injectable({ providedIn: 'root' })
export class RegistrationService {
    constructor(private http: HttpClient) {}

    register(username: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}/register`,
        { 'username': username, 'password': password })
        .pipe(map((reply) => {
            if (reply['error'])
                throw new Error(reply['error']);
            return reply;
        }));
    }
}

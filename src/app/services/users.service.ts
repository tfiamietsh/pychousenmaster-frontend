import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';
import { UserItem } from '../helpers/user-item';

@Injectable({ providedIn: 'root' })
export class UsersService {
    constructor(private http: HttpClient) { }

    getUsers(pattern: string) {
        return this.http.get<UserItem[]>(`${environment.apiUrl}/users/%${pattern}%`);
    }
}

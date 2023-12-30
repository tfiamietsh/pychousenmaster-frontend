import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';
import { Profile } from '../helpers/profile';

@Injectable({ providedIn: 'root' })
export class ProfileService {
    constructor(private http: HttpClient) { }

    getProfile(username: string) {
        return this.http.get<Profile>(`${environment.apiUrl}/profile/${username}`);
    }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';

@Injectable({ providedIn: 'root' })
export class TagsService {
    constructor(private http: HttpClient) { }

    getTags() {
        return this.http.get<string[]>(`${environment.apiUrl}/tags`);
    }
}

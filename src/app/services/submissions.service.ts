import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';
import { SubmissionsInfo } from '../helpers/submissions-info';

@Injectable({ providedIn: 'root' })
export class SubmissionsService {
    constructor(private http: HttpClient) { }

    getSubmissionsInfo(problem_title: string, user_id: string) {
        return this.http.get<SubmissionsInfo>(`${environment.apiUrl}/submissions/${problem_title}+${user_id}`);
    }
}

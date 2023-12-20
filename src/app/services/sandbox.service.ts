import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';

@Injectable({ providedIn: 'root' })
export class SandboxService {
    constructor(private http: HttpClient) { }

    run(problem_title: string, code: string, testcases: string) {
        return this.http.post<string[]>(`${environment.apiUrl}/run`,
        { 'title': problem_title, 'code': code, 'testcases': testcases },
        { withCredentials: true });
    }

    submit(problem_title: string, user_id: string, code: string) {
        return this.http.post<any>(`${environment.apiUrl}/submit`,
        { 'title': problem_title, 'user_id': user_id, 'code': code },
        { withCredentials: true });
    }
}

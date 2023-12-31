import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';
import { Problem } from '../helpers/problem';

@Injectable({ providedIn: 'root' })
export class ProblemService {
    constructor(private http: HttpClient) { }

    newProblem(problem: string) {
        return this.http.post<any>(`${environment.apiUrl}/new-problem`,
        { 'problem': problem }, { withCredentials: true });
    }

    getProblemByTitle(title: string) {
        return this.http.get<Problem>(`${environment.apiUrl}/problem/${title}`);
    }
}

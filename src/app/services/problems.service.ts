import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';
import { ProblemItem } from '../helpers/problem-item';

@Injectable({ providedIn: 'root' })
export class ProblemsService {
    constructor(private http: HttpClient) { }

    getProblems(mask: number, userId: string, pattern: string = '') {
        return this.http.get<ProblemItem[]>(`${environment.apiUrl}/problems/${mask}+${userId}+%${pattern}%`);
    }
}

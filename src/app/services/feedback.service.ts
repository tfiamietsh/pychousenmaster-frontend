import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';
import { Feedback } from '../helpers/feedback';

@Injectable({ providedIn: 'root' })
export class FeedbackService {
    constructor(private http: HttpClient) { }

    getFeedback(problem_title: string, user_id: string) {
        return this.http.get<Feedback>(`${environment.apiUrl}/feedback/${problem_title}+${user_id}`);
    }

    leaveFeedback(problem_title: string, user_id: string, feedback: number) {
        this.http.post<any>(`${environment.apiUrl}/feedback`,
        { 'title': problem_title, 'user_id': user_id, 'feedback': feedback },
        { withCredentials: true }).subscribe();
    }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';
import { Challenge } from '../helpers/challenge';
import { AuthenticationService } from './authentication.service';

@Injectable({ providedIn: 'root' })
export class ChallengesService {
    constructor(private http: HttpClient, private authService: AuthenticationService) { }

    newChallenge(username: string, challengeName: string) {
        return this.http.post<any>(`${environment.apiUrl}/new-challenge`,
        { 'username': username, 'name': challengeName },
        { withCredentials: true });
    }

    toggleChallengeAccessSpecifier(username: string, challenge_name: string) {
        return this.http.post<any>(`${environment.apiUrl}/toggle-challenge`,
        { 'username': username, 'name': challenge_name },
        { withCredentials: true });
    }

    getChallenges(username: string) {
        const authorized = this.authService.user.username == username;
        return this.http.get<Challenge[]>(`${environment.apiUrl}/challenges/${username}+${authorized}`);
    }

    deleteChallenge(username: string, challengeName: string) {
        return this.http.post<any>(`${environment.apiUrl}/delete-challenge`,
        { 'username': username, 'name': challengeName },
        { withCredentials: true });
    }

    deleteProblem(username: string, challengeName: string, problemTitle: string) {
        return this.http.post<any>(`${environment.apiUrl}/delete-challenge-problem`,
        { 'username': username, 'challenge_name': challengeName, 'problem_title': problemTitle },
        { withCredentials: true });
    }
}

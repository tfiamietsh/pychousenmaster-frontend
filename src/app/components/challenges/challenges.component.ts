import { Component } from '@angular/core';
import { ChallengeItem } from 'src/app/helpers/challenge-item';
import { ChallengesService } from 'src/app/services/challenges.service';

@Component({
  selector: 'challenges',
  templateUrl: './challenges.component.html',
  styleUrl: './challenges.component.sass'
})
export class ChallengesComponent {
    challenges: ChallengeItem[] = [];

    constructor(private challengesService: ChallengesService) { }

    ngOnInit() {
        this.challengesService.getChallenges()
            .subscribe(response => this.challenges = response['challenges']);
    }

    makeLinkToChallenge(username: string) {
        return `/challenges/${username}`;
    }

    makeLinkToUser(username: string) {
        return `/profile/${username}`;
    }
}

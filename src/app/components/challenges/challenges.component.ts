import { Component } from '@angular/core';
import { ChallengeItem } from 'src/app/helpers/challenge-item';
import { ChallengesService } from 'src/app/services/challenges.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'challenges',
  templateUrl: './challenges.component.html',
  styleUrl: './challenges.component.sass'
})
export class ChallengesComponent {
    challenges: ChallengeItem[] = [];

    constructor(private challengesService: ChallengesService, private loadingService: LoadingService) { }

    ngOnInit() {
        this.challengesService.getChallenges()
            .subscribe(response => this.challenges = response['challenges']);
    }

    ngAfterViewInit() {
        this.loadingService.toggleState();
    }

    ngOnDestroy() {
        this.loadingService.toggleState();
    }

    makeLinkToChallenge(username: string) {
        return `/challenges/${username}`;
    }

    makeLinkToUser(username: string) {
        return `/profile/${username}`;
    }
}

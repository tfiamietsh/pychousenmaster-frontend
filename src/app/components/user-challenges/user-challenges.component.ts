import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { NewChallengeDialogComponent } from "../new-challenge-dialog/new-challenge-dialog.component";
import { ChallengesService } from 'src/app/services/challenges.service';
import { AuthenticationService } from "src/app/services/authentication.service";
import { Challenge } from "src/app/helpers/challenge";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'user-challenges',
  templateUrl: './user-challenges.component.html',
  styleUrl: './user-challenges.component.sass'
})
export class UserChallengesComponent {
    challenges: Challenge[];
    challengesColumns: string[] = ['name', '_'];
    challengeIdx: number = 0;
    selectedIdx: number = -1;
    username: string;

    constructor(private dialog: MatDialog, private route: ActivatedRoute,
        private authService: AuthenticationService, private challengesService: ChallengesService) { }
    
    ngOnInit() {
        this.username = this.route.snapshot.paramMap.get('username');
        this.challengesService.getUserChallenges(this.username).subscribe(response => {
            let challengeName = this.route.snapshot.queryParams['challenge'];
            
            this.challenges = response['challenges'];
            this.challengeIdx = 0;
            if (challengeName)
                for (let i = 0; i < this.challenges.length; i++)
                    if (this.challenges[i].name === challengeName)
                        this.challengeIdx = i;
        });
    }

    get title() {
        return `${this.authorized ? 'My' : this.username + '\'s'} Challenges`;
    }

    get challenge() {
        return this.challenges[this.challengeIdx];
    }

    get toggleText() {
        return this.challenge.isPublic ? 'Public' : 'Private';
    }

    get authorized() {
        return this.authService.user.username == this.username;
    }

    toggle() {
        this.challengesService.toggleChallengeAccessSpecifier(this.username, this.challenge.name)
            .subscribe(_ => this.updateChallenges());
    }

    challengeIcon(isPublic: boolean) {
        return isPublic ? 'public' : 'lock';
    }
    
    setChallengeIdx(idx: number) {
        this.challengeIdx = idx;
    }

    setSelectedIdx(idx: number) {
        this.selectedIdx = idx;
    }

    openDialog() {
        const dialogRef = this.dialog.open(NewChallengeDialogComponent);
        dialogRef.componentInstance.username = this.username;
        dialogRef.afterClosed().subscribe(_ => this.updateChallenges());
    }

    updateChallenges() {
        this.challengesService.getUserChallenges(this.username).subscribe(response => {
            this.challenges = response['challenges'];
        });
    }

    deleteChallenge() {
        this.challengesService.deleteChallenge(this.username, this.challenge.name)
            .subscribe(_ => this.updateChallenges());
    }

    deleteProblem() {
        this.challengesService.deleteProblem(this.username, this.challenge.name,
            this.challenge.problems[this.selectedIdx]).subscribe(_ => {
                this.updateChallenges();
                this.selectedIdx++;
                if (this.selectedIdx == this.challenge.problems.length)
                    this.selectedIdx = this.challenge.problems.length == 0 ? -1 : 0;
            });
    }

    makeLink(name: string) {
        return `/problems/${name.toLowerCase().replace(' ', '-')}`;
    }
}

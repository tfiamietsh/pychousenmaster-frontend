import { Component } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { ChallengesService } from 'src/app/services/challenges.service';

@Component({
  selector: 'new-challenge-dialog',
  templateUrl: './new-challenge-dialog.component.html',
  styleUrl: './new-challenge-dialog.component.sass'
})
export class NewChallengeDialogComponent {
    private inputElem: HTMLInputElement | any;
    public username: string;
    
    constructor(private dialogRef: MatDialogRef<NewChallengeDialogComponent>,
        private challengesService: ChallengesService) { }

    ngOnInit() {
        this.inputElem = document.getElementById("input");
    }

    confirm() {
        let challengeName = this.inputElem.value;
        if (challengeName)
            this.challengesService.newChallenge(this.username, challengeName).subscribe();
        this.close();
    }

    close(): void {
        this.dialogRef.close();
    }
}

import { Component } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'problem',
  templateUrl: './problem.component.html',
  styleUrl: './problem.component.sass'
})
export class ProblemComponent {
    title: string;
    colors: string[] = ['deepskyblue', 'darkorange', 'crimson'];
    difficulties: string[] = ['Easy', 'Medium', 'Hard'];
    difficultyIdx: number;
    states: string[] = ['Solved', 'Attempted', ''];
    stateIcons: string[] = ['panorama_fish_eye', 'change_history'];
    stateIdx: number;
    liked: number;
    disliked: number;
    description: string;
    totalAccepted: number;
    totalSubmissions: number;
    tags: string[];
    testcases: any;
    testcaseIdx: number;
    results: string[];
    resultIdx: number;
    status: string;
    stColumns: string[] = ['status', 'runtime', 'memory'];
    submissions: any;
    editorDiv: HTMLDivElement | any;

    constructor(private authService: AuthenticationService, private router: Router) { }

    ngOnInit() {
        this.editorDiv = document.getElementsByClassName('editor-div')[0];
    }

    get difficulty() {
        return this.difficulties[this.difficultyIdx];
    }

    get difficultyStyle() {
        return 'color:' + this.colors[this.difficultyIdx];
    }

    get state() {
        return this.states[this.stateIdx];
    }

    get stateStyle() {
        return 'color:' + this.colors[this.stateIdx];
    }

    get stateIcon() {
        return this.stateIcons[this.stateIdx];
    }

    get ar() {
        return (100 * this.totalAccepted / this.totalSubmissions).toFixed(1) + '%';
    }

    get user() {
        return this.authService.user;
    }

    like() {
        if (this.user) {
            //  TODO
        }
    }

    dislike() {
        if (this.user) {
            //  TODO
        }
    }
    
    problemTabChange(event: MatTabChangeEvent) {
        if (event.index == 1)
            this.router.navigate(['/discussion']);
    }

    setTestcaseIdx(i: number) {
        this.testcaseIdx = i;
    }

    get testcase() {
        return this.testcases[this.testcaseIdx];
    }

    tcCaseColor(i: number) {
        return i == this.testcaseIdx ? 'primary' : '';
    }

    setResultIdx(i: number) {
        this.resultIdx = i;
    }

    get result() {
        return this.testcases[this.resultIdx];
    }

    get expected() {
        return this.results[this.resultIdx];
    }

    rCaseColor(i: number) {
        return i == this.resultIdx ? 'primary' : '';
    }

    statusColor(status: string) {
        const idx = status === 'Accepted' ? 0 : 2;
        return `color: ${this.colors[idx]}`;
    }

    caseDotStyle(i: number) {
        const idx = this.testcases[i].output == this.results[i] ? 0 : 2;
        return `font-size: 8px; color: ${this.colors[idx]}`;
    }

    resetCode() {
        //  TODO
    }

    retrieveCode() {
        //  TODO
    }

    run() {
        //  TODO
    }

    submit() {
        //  TODO
    }

    openDialog() {
        //  TODO
    }

    select(submission: any) {
        this.editorDiv.innerText = submission.code;
    }
}
